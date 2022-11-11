export const richTextRenderer = (contentContainer, short=false) => {
    const { content = [] } = contentContainer;
    let result = "";
    let firstPara = "";
    let paraCount = 0;
    if(content.length > 0) {
      content.forEach((child) => {
        if(child?.component === "description") {
          child?.text?.content.forEach((item) => {
            const childContent = item?.content || [];
            if(childContent.length > 1) {
              childContent.forEach((childItem) => {
                result += childItem.text;
              })
            } else if(childContent.length > 0){
              result += childContent[0].text;
            }
          })
        }
        if(result.length > 0 && short && paraCount === 0) {
          firstPara = result;
          paraCount = 1;
        }
      })
      if(short) {
        return firstPara;
      }
      return result;
    }
  }
