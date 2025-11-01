import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeFilter, setActiveFilter] = useState('home'); // 'home', 'tvshows', 'movies'
  const navigate = useNavigate();

  // All content with type
  const allContent = [
    { 
      id: 1, 
      title: 'Stranger Things', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      trailer: 'b9EkMc79ZSU'
    },
    { 
      id: 2, 
      title: 'The Witcher', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
      trailer: 'ndl1W4ltcmg'
    },
    { 
      id: 3, 
      title: 'Money Heist', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
      trailer: '_InqKYnqGW4'
    },
    { 
      id: 4, 
      title: 'Breaking Bad', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      trailer: 'HhesaQXLuRY'
    },
    { 
      id: 5, 
      title: 'The Crown', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg',
      trailer: 'JWtnJjn6ng0'
    },
    { 
      id: 6, 
      title: 'Narcos', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg',
      trailer: 'U7elNhHwgBU'
    },
    { 
      id: 7, 
      title: 'Friends', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
      trailer: 'IEEbUzffzrk'
    },
    { 
      id: 8, 
      title: 'Guntur Kaaram', 
      type: 'movie',
      poster: 'https://m.media-amazon.com/images/M/MV5BZWY4MWY1NTUtNDYzZC00ODg0LWE3ZTUtOWJiZWI5MmEzOWVjXkEyXkFqcGdeQXVyMTYyNjAzNDYy._V1_FMjpg_UX1000_.jpg',
      trailer: 'q8Y4JJZqRsE'
    },
    { 
      id: 9, 
      title: 'They Call Him OG', 
      type: 'movie',
      poster: 'https://assets.gadgets360cdn.com/pricee/assets/product/202307/OG_1689670456.jpg',
      trailer: 'EiB2KjQPj3E'
    },
    { 
      id: 10, 
      title: 'Squid Game', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
      trailer: 'oqxAJKy0ii4'
    },
    { 
      id: 13, 
      title: 'HIT: The Third Case', 
      type: 'movie',
      poster: 'https://assets.gadgets360cdn.com/pricee/assets/product/202307/HIT-The-3rd-Case_1689671439.jpg',
      trailer: 'XxG-deLJJJo'
    },
    { 
      id: 14, 
      title: 'Bads of Bollywood', 
      type: 'movie',
      poster: 'https://m.media-amazon.com/images/M/MV5BYjNiZWQ4YTUtZjEyMy00NDBmLThiZDktYTgwYmNhNGIyMDk1XkEyXkFqcGdeQXVyMTIwMjYyNjMx._V1_FMjpg_UX1000_.jpg',
      trailer: 'GQkCwLeYPCM'
    },
    { 
      id: 15, 
      title: 'Game of Thrones', 
      type: 'tvshow',
      poster: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
      trailer: 'KPLWWIOCOOQ'
    },
    { 
      id: 16, 
      title: 'The Dark Knight', 
      type: 'movie',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      trailer: 'EXeTwQWrcwY'
    },
  ];

  const getFilteredContent = () => {
    if (activeFilter === 'tvshows') {
      return allContent.filter(item => item.type === 'tvshow');
    } else if (activeFilter === 'movies') {
      return allContent.filter(item => item.type === 'movie');
    }
    return allContent; // show all for 'home'
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token === 'admin-token' && storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    if (token && token !== 'admin-token') {
      fetchProfile();
    } else if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  if (!user) return <div style={styles.loading}>Loading...</div>;

  const filteredContent = getFilteredContent();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.leftSection}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            style={styles.netflixLogo}
          />
          <nav style={styles.nav}>
            <a 
              onClick={() => handleFilterClick('home')} 
              style={{...styles.navLink, ...(activeFilter === 'home' ? styles.activeLink : {})}}
            >
              Home
            </a>
            <a 
              onClick={() => handleFilterClick('tvshows')} 
              style={{...styles.navLink, ...(activeFilter === 'tvshows' ? styles.activeLink : {})}}
            >
              TV Shows
            </a>
            <a 
              onClick={() => handleFilterClick('movies')} 
              style={{...styles.navLink, ...(activeFilter === 'movies' ? styles.activeLink : {})}}
            >
              Movies
            </a>
            <a href="#" style={styles.navLink}>New & Popular</a>
            <a href="#" style={styles.navLink}>My List</a>
          </nav>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.username}>Welcome, {user.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
      
      <div style={styles.content}>
        <h2 style={styles.sectionTitle}>
          {activeFilter === 'tvshows' ? 'TV Shows' : activeFilter === 'movies' ? 'Movies' : 'Trending Now'}
        </h2>
        <div style={styles.movieGrid}>
          {filteredContent.map(movie => (
            <div 
              key={movie.id} 
              style={styles.movieCard}
              onClick={() => handleMovieClick(movie)}
            >
              <img 
                src={movie.poster} 
                alt={movie.title}
                style={styles.moviePoster}
              />
              <div style={styles.movieTitle}>{movie.title}</div>
              <div style={styles.playIcon}>▶</div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedMovie && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={closeModal}>✕</button>
            <h2 style={styles.modalTitle}>{selectedMovie.title}</h2>
            <div style={styles.videoWrapper}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedMovie.trailer}?autoplay=1`}
                title={selectedMovie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.iframe}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#141414',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
    background: '#000',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  netflixLogo: {
    height: '30px',
    width: 'auto',
  },
  nav: {
    display: 'flex',
    gap: '25px',
  },
  navLink: {
    color: '#e5e5e5',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
  activeLink: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  username: {
    fontSize: '14px',
    color: '#fff',
  },
  logoutBtn: {
    background: '#e50914',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  content: {
    padding: '40px 50px',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: '600',
  },
  movieGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '50px',
  },
  movieCard: {
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    position: 'relative',
  },
  moviePoster: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '8px',
    transition: 'transform 0.3s ease',
  },
  movieTitle: {
    fontSize: '14px',
    color: '#e5e5e5',
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '40px',
    color: '#fff',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#181818',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '900px',
    padding: '20px',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 10,
  },
  modalTitle: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '8px',
  },
  loading: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#141414',
    color: '#fff',
    fontSize: '20px',
  }
};

export default Dashboard;
