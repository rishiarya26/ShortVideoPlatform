export const richTextRenderer = (contentContainer) => {
    const { content = [] } = contentContainer;
    let result = "";
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
      })
      return result;
    }
  }
