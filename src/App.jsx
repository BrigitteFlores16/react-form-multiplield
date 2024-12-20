import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
     image: '',
    content: '',
    category: '',
    published: false
  });
  
  const [articles, setArticles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({...formData,[name]: type === 'checkbox' ? checked : type === 'file' ? URL.createObjectURL(files[0]) : value });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.content || !formData.category) {
      alert("Inserisci tutti i valori");
      return;
    }
    setArticles([...articles, formData]);
    setFormData({
      title: '',
      author: '',
      image: '',
      content: '',
      category: '',
      published: false
    });
  }
  
  const deleteArticle = (articleIndex) => { 
    const newArticles = [...articles]; 
    newArticles.splice(articleIndex, 1);
     setArticles(newArticles);
  };

  const editArticle = (articleIndex) => {
    const newTitle = prompt('Modifica il titolo:', articles[articleIndex].title);
    if (newTitle) {
      const newArticles = articles.map((article, i) =>
        i === index ? { ...article, title: newTitle } : article
      );
      setArticles(newArticles);
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="mt-5">Articoli Blog</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Titolo dell'articolo"
            className="form-control mb-2"
            required
          />
          <input
           type="text"
           name="author"
           value={formData.author}
           onChange={handleInputChange}
           placeholder="Autore"
           className="form-control mb-2"
           required
          />
          <input
             type="file"
             name="image"
             onChange={handleInputChange}
             className="form-control mb-2"
          />
          <input
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Contenuto dell'articolo"
            className="form-control mb-2"
            required
          />
         <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-control mb-2"
            required
          >
            <option value="">Seleziona una categoria</option>
            <option value="Categoria1">Categoria1</option>
            <option value="Categoria2">Categoria2</option>
          </select>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="form-check-input"
            />
            <label className="form-check-label">Pubblica</label>
          </div>
          <button type="submit" className="btn btn-primary m-2">Aggiungi Articolo</button>
          </form>
          <ul className="list-group mt-3">
          {articles.map((article, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
             {article.title} - {article.author}  - {article.category} - {article.published ? 'Pubblicato' : 'Non Pubblicato'}
            </span>
          {article.image && <img src={article.image} alt={article.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
            <div className="button-container">
            <button className="btn btn-success btn-sm me-2" onClick={() => editArticle(index)}>Modifica</button>
            <button className="btn btn-danger btn-sm " onClick={() => deleteArticle(index)}><span class="material-symbols-outlined">delete</span></button>
            </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;




