import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

interface CopyLinkProps {
    link: string;
}

const CopyLink: FC<CopyLinkProps> = ({ link }) => {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(link);
        } catch (error) {
            console.error("Failed to copy link: ", error);
        }
    };

    return (
        <p onClick={handleCopyLink}>
            <FontAwesomeIcon icon={faLink} />
            {link}
        </p>
    );
};

export default CopyLink;
