// import React, { useEffect, useRef, useState } from "react";
// import Editor from "@monaco-editor/react";
// import styles from "../styles/monacoStyle.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import CopyLink from "./CopyLink";

// interface MonacoEditorProps {
//     code: { value: string; language: string };
//     isShared: boolean;
//     onValueChange: (value: string) => void;
//     onLangueChange: (value: string) => void;
//     onShare: () => void;
//     link: string;
// }

// const MonacoEditor: React.FC<MonacoEditorProps> = ({
//     code,
//     isShared,
//     onValueChange,
//     onLangueChange,
//     onShare,
//     link,
// }) => {
//     const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
//     const [theme, setTheme] = useState<string>("vs-light");

//     useEffect(() => {
//         editorRef.current.onDidChangeModelContent(() => {
//             onChange(editorRef.current!.getValue());
//             if (isShared) {
//                 onShare();
//             }
//         });

//         return () => {
//             editorRef.current!.dispose();
//         };
//     });

//     const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const lang = event.target.value;
//         monaco.editor.setModelLanguage(editorRef.current!.getModel()!, lang);
//         onLangueChange(lang);
//     };

//     const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const color = event.target.value;
//         setTheme(color);
//         monaco.editor.setTheme(color);
//     };

//     return (
//         <div
//             className={`${styles.editorContainer} ${theme === "vs-dark" ? "dark" : ""}`}
//             data-theme={theme}
//         >
//             <Editor
//                 className={styles.editor}
//                 onChange={(value) => onChange(value)}
//                 beforeMount={handleEditorWillMount}
//                 onMount={handleEditorDidMount}
//             />
//             <div className={styles.configContainer}>
//                 <div>
//                     <select onChange={handleLanguageChange}>
//                         <option value="html">HTML</option>
//                         <option value="javascript">JavaScript</option>
//                         <option value="typescript">TypeScript</option>
//                         <option value="python">Python</option>
//                         <option value="rust">Rust</option>
//                         <option value="java">Java</option>
//                     </select>
//                     <select onChange={handleThemeChange} value={theme}>
//                         <option value="vs-light" defaultChecked>
//                             Light
//                         </option>
//                         <option value="vs-dark">VS Dark</option>
//                     </select>
//                 </div>
//                 <div className={styles.shareContainer}>
//                     {isShared && <CopyLink link={link} />}
//                     <button
//                         className={styles.shareBtn}
//                         onClick={() => onShare()}
//                         disabled={isShared}
//                     >
//                         <FontAwesomeIcon icon={faShareNodes} />
//                         Share
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MonacoEditor;
