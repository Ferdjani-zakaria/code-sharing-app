import { ChangeEvent, MouseEvent, FC, useState, useEffect, useRef } from "react";
import NoteCodeLogo from "@/assets/img/NoteCodeLogo.svg?react";
import CopyLink from "./components/CopyLink";
import Editor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { regNewPage } from "@/utils/regNewPage";
import { fetchDataFromDatabase } from "@/utils/fetchDataFromDatabase";
import "./styles/homePageStyle.scss";
import styles from "./styles/monacoStyle.module.scss";

const defaultcode = `<html>
<head>
  <title>HTML Sample</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style type="text/css">
    h1 { color: #CCA3A3; }
  </style>
  <script type="text/javascript">
    alert("I am a sample... visit devChallenges.io for more projects");
  </script>
</head>
<body>
  <h1>Heading No.1</h1>
  <input disabled type="button" value="Click me" />
</body>
</html>
`;

export const HomePage: FC = () => {
    const monacoRef = useRef("");
    const { id } = useParams();
    const [link, setLink] = useState<string>("");
    const [isShared, setIsShared] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>("vs-light");
    const [lang, setLang] = useState<string>("html");
    const [code, setCode] = useState<string>(defaultcode);

    const navigate = useNavigate();

    useEffect(() => {
        if (isShared) {
            setIsShared((prev) => !prev);
            navigate(`../`);
        }
    }, [code, lang]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the database based on the ID
                const result = await fetchDataFromDatabase(id);
                setLang(`${result.language}`);
                setCode(result.editorValue);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id) {
            fetchData();
        }

        return () => {};
    }, []);

    useEffect(() => {
        const stockData = async () => {
            const data = await regNewPage(code, lang);
            if (data) {
                navigate(`/${data.id}`);
                setLink(`${window.location.href}`);
            }
        };
        if (isShared) {
            stockData();
        }
    }, [isShared]);

    const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newTheme = event.target.value;
        setTheme(newTheme);
    };
    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newLang = event.target.value;
        setLang(newLang);
    };

    const handleEditorDidMount = (_editor, monaco) => {
        monacoRef.current = monaco;
    };

    const handleShare = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsShared((prev) => !prev);
    };

    return (
        <div className="blue">
            <div className="homePageContainer">
                <NoteCodeLogo />
                <div className="homepageHeaderContainer">
                    <h2>Create & Share</h2>
                    <h1>Your Code easily</h1>
                </div>
                {/* <main className="editorContainer"> */}
                <main
                    className={`${styles.editorContainer} ${
                        theme === "vs-dark" ? "dark" : ""
                    }`}
                    data-theme={theme}
                >
                    <Editor
                        className={styles.editor}
                        language={lang}
                        defaultValue={code}
                        theme={theme}
                        onChange={(value) => setCode(value)}
                        onMount={handleEditorDidMount}
                    />
                    <div className={styles.configContainer}>
                        <div>
                            <select onChange={handleLanguageChange} value={lang}>
                                <option value="html">HTML</option>
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="python">Python</option>
                                <option value="rust">Rust</option>
                                <option value="java">Java</option>
                            </select>
                            <select
                                onChange={(e) => handleThemeChange(e)}
                                defaultValue={lang}
                            >
                                <option value="vs-light">Light</option>
                                <option value="vs-dark">VS Dark</option>
                            </select>
                        </div>
                        <div className={styles.shareContainer}>
                            {isShared && <CopyLink link={link} />}
                            <button
                                className={styles.shareBtn}
                                // () => setIsShared((prev) => !prev)
                                onClick={handleShare}
                                disabled={isShared}
                            >
                                <FontAwesomeIcon icon={faShareNodes} />
                                Share
                            </button>
                        </div>
                    </div>
                </main>
                {/* </main> */}
            </div>
        </div>
    );
};
