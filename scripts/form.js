const getParameter = (key) => {
  let queryParams = new URLSearchParams(window.location.search);
  const value = queryParams.get(key);
  return value;
}

const category = getParameter("category");
document.querySelector("input[name='category']").value = category;