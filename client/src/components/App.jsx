import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search.jsx';
import BubbleChart from './BubbleChart.jsx';

// EXAMPLE FOR TESTING //
const dummyData = [
  {
    storyName: 'example storyname 1',
    url: 'https://www.google.com/',
    rating: 22,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 2',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 2
  },
  {
    storyName: 'example storyname 3',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 4
  },
  {
    storyName: 'example storyname 4',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 3
  },
  {
    storyName: 'example storyname 5',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 6',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 7',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 2
  },
  {
    storyName: 'example storyname 8',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 9',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 14',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 2
  },
  {
    storyName: 'example storyname 24',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 34',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 44',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 54',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 64',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 74',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 84',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 94',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 64',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  },
  {
    storyName: 'example storyname 74',
    url: 'https://www.google.com/',
    rating: 14,
    newsCategory: 1
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    // //////start testing//////////
    // to assign a random category (will come from db later)
    const getCategory = () => Math.floor(Math.random() * 4);

    // to assign a random rating (will come from db later)
    const getRating = () => {
      const ratings = [4, 6, 8, 10, 11, 8, 20];
      const rating = ratings[Math.floor(Math.random() * ratings.length)];
      return rating;
    };

    console.log(getRating());

    // iterate through story objects and assign random category and rating
    dummyData.forEach((storyObj) => {
      const testObj = storyObj;
      const category1 = getCategory();
      const rating = getRating();
      testObj.newsCategory = category1;
      testObj.rating = rating;
    });
    // /////end testing///////////

    this.state = {
      location: '',
      // remember to change back to empty array after done using dummy data
      data: []
    };

    // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSuggestionSelect = this.handleSuggestionSelect.bind(this);
    this.getNewsByLocation = this.getNewsByLocation.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getNewsByLocation(loc) {
    console.log('inside getNewsByLocation');
    console.log('location: ', loc);
    // const query = loc.split(' ').join('+');
    // console.log('joined query: ', query);
    // const encoded = encodeURIComponent(query);
    // console.log('encoded: ', encoded);
    /* global $ */
    const locObj = JSON.stringify(loc);

    $.ajax({
      method: 'GET',
      url: '/query',
      dataType: 'json',
      data: { q: locObj },
      success: (data) => {
        // data = dummyData; //FOR TESTING - NEED TO REMOVE THIS LINE

        // to assign a random category (will come from db later)
        const getCategory = () => Math.floor(Math.random() * 4);

        // to assign a random rating (will come from db later)
        const getRating = () => {
          const ratings = [4, 6, 8, 10, 11, 8, 20];
          const rating = ratings[Math.floor(Math.random() * ratings.length)];
          return rating;
        };

        data = data.slice(0, 50);
        console.log('rendering', data.length, ' gifs');

        // iterate through story objects and assign random category and rating
        let reqCount = 0;
        data.forEach((storyObj) => {
          const testObj = storyObj;
          const category1 = getCategory();
          const rating = getRating();
          testObj.newsCategory = category1;
          testObj.newsCategory = category1;
          testObj.rating = rating;

          reqCount++;

          $.ajax({
            method: 'GET',
            url: `http://api.giphy.com/v1/gifs/search`,
            dataType: 'json',
            data: {
              q: storyObj.title,
              api_key: 'dc6zaTOxFJmzC'
            },
            success: (d) => {
              testObj.image = d.data[0].images.original.url;
              reqCount--;
              if (reqCount === 0) {
                this.setState({ data });
              }
            }
          });
        });

        // changed from data.value
        this.setState({ data });
      },

      error: (err) => {
        console.log('getNews err ', err);
      }
    });
  }

  handleSuggestionSelect(e) {
    console.log('selection e:', e);
    const loc = e.label;
    this.setState({ location: loc });
    this.getNewsByLocation(e);
  }

  // Possible redundant code --> It is getting passed down to submit
    // But it is never being called
  // handleSearchSubmit(e) {
  //   console.log('inside handleSearchSubmit');
  //   e.preventDefault();
  //   const location = this.state.location;
  //   if (!location) {
  //     return;
  //   }

  //   this.getNewsByLocation(location);
  // }

  handleSearchChange(e) {
    console.log('inside handleSearchChange');
    e.preventDefault();
    this.setState({ location: e.target.value });
  }

  handleClick(d, e) {
    console.log('inside handleClick, d:', d, this, e);
    window.open(d.url);
  }

  render() {
    return (
      <div>
        <section>
          <Search
            props={this.props}
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit}
            handleSuggestionSelect={this.handleSuggestionSelect}
          />
        </section>
        <section>
          <BubbleChart data={this.state.data} handleClick={this.handleClick} />
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
