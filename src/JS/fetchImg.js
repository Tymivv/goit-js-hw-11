const API_KEY = '24480500-399700875c121f80bab96d725';
const limit = 40;
export function fetchImg(name, page) {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`,
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
