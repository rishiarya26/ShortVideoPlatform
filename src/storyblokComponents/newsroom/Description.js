import { storyblokEditable } from "@storyblok/react";
import { generateUUID } from "../../utils/app";
import styles from "./description.module.css";

function extractLink(dataObj) {
  const {
    attrs: { href },
  } = dataObj;
  return href;
}
function checkRichTextOrText(dataObj) {
  if (Object.keys(dataObj).includes("marks")) return true;
  return false;
}
function generateRichPara(paraItem) {
  if (!checkRichTextOrText(paraItem)) {
    return paraItem.text;
  }
  const type = paraItem.marks[0].type;
  let richText = "";
  switch (type) {
    case "bold":
      richText = `<b>${paraItem.text}</b>`;
      break;
    case "link":
      richText = `<a href=${extractLink(paraItem?.marks?.[0])}>${
        paraItem.text
      }</a>`;
      break;
  }
  return richText;
}

const Description = ({ blok = {} }) => {
  const { text: { content = {} } = {} } = blok;

  return (
    <div className="my-3" {...storyblokEditable(blok)}>
      {content.length > 0 &&
        content?.map((data) => {
          const uuid = generateUUID(false);
          let subPara = "";
          if (data?.content) {
            data?.content.forEach((paraItem) => {
              subPara = subPara + generateRichPara(paraItem);
            });
            return (
              <>
                <span
                  key={uuid}
                  className={styles.link}
                  dangerouslySetInnerHTML={{ __html: subPara }}
                />
                <br />
              </>
            );
          } else {
            return <br key={uuid} />;
          }
        })}
    </div>
  );
};

export default Description;
