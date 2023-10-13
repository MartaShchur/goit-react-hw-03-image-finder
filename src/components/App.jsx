import { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
// import Loader from '../Loader/Loader';
// import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchName: '', 
    images: [], 
    currentPage: 1, 
    error: null, 
    isLoading: false, 
    totalPages: 0, 
  };

  // Meтод життєвого циклу
  componentDidUpdate(_, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages(); 
    }
  }

  // Метод загрузки
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Метод для обробки відправки форми
  handleSubmit = query => {
    this.setState({
      searchName: query, 
      images: [], 
      currentPage: 1, 
    });
  };

  // Метод для отримання і добавлення images
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true }); // Устанавливаем флаг загрузки

      // Получаем данные с помощью API запроса к Pixabay
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        // Если изображения не найдены, выводим сообщение
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

     
      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages], 
        isLoading: false, 
        error: '', 
        totalPages: Math.ceil(data.totalHits / 12), 
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); 
    } finally {
      this.setState({ isLoading: false }); 
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
            Image gallery is empty... 
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} /> 
        )}
      </div>
    );
  }
}

export default App;