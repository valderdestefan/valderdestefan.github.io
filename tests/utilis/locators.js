const listerUrl =
  "http://localhost:9000/login/?next=%2Fa%2F%23%2F#/documents-next?sortBy=date_modified&direction=desc&displayMode=folders_first&customDate=date_modified&mainFilter=all";

const listerTableSelector = "div[class*='InfiniteListerTable']";
const docItemSelector = "tr[class*=document-item]";
const documentText = "uploaded copy";
const threeDotsSelector = "table-actions-handle";
const menusSelector = "[data-testid*='menu']";

export {
  listerUrl,
  listerTableSelector,
  docItemSelector,
  documentText,
  threeDotsSelector,
  menusSelector,
};
