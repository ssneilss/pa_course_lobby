import React, {Component} from 'react';
import styles from './HomePage.css';
import withStyles from '../../decorators/withStyles';
import SubHeader from './SubHeader';
import AppStore from '../../stores/app-store';

@withStyles(styles)

//
// class HomePage extends Component {
//   handleClick(){
//     AppStore.addItem('{id:1, name: "item1"}');
//   }
//   render(){
//     return(
//       <div>
//         <h1 className="HomePage-h1" onClick={this.handleClick}>HomePage fewf</h1>
//         <SubHeader/>
//       </div>
//     )
//   }
// }
//
class HomePage extends Component {
  // constructor(props) {
  //
  // }
  static propTypes = {
    currentWorld: React.PropTypes.string,
    bannerImgSrc: React.PropTypes.string,
    panelImg: React.PropTypes.array,
    productByCategory: React.PropTypes.array,
    products: React.PropTypes.array
  };
  static defaultProps = {
    currentWorld: "current-world",
    bannerImg: require('../../public/images/banner.png'),
    panelImgs: [ // panel in banner
      require('../../public/images/male_plus.png'),
      require('../../public/images/tutorial-1.png'),
      require('../../public/images/enter.png'),
      require('../../public/images/my_course.png')
    ]
  };
  render() {
    return(
      <div className="homepage-wrapper">
        <ContinueGame world={this.props.currentWorld} />
        <MainBanner bannerImg={this.props.bannerImg} panelImgs={this.props.panelImgs}/>
      </div>
    )
  }
}

class ContinueGame extends Component {
  render() {
    return(
      <div className="continue-game">
        <h4>Continue game in {this.props.world}</h4>
      </div>
    )
  }
}

class MainBanner extends Component {
  render() {
    return(
      <div className="main-banner">
        <div className="main-panel">
          <img src={this.props.bannerImg}></img>
          <FeaturePanel panelImgs={this.props.panelImgs} />
        </div>
      </div>
    )
  }
}

class FeaturePanel extends Component {
  render() {
    return(
      <ul className="feature-panel">
        <li><img src={this.props.panelImgs[0]} /><h4>Join a Course</h4></li>
        <li><a href="/tutorials"><img src={this.props.panelImgs[1]} /><h4>Tutorials</h4></a></li>
        <li><img src={this.props.panelImgs[2]} /><h4>Create Course</h4></li>
        <li><img src={this.props.panelImgs[3]} /><h4>My Courses</h4></li>
      </ul>
    )
  }
}

//product content wrapper
class ProductContent extends Component {
  render() {
    return (
      <div className="product-content-wrapper">
        <div className="product-content">
          <ProductFilter filterNames = {this.props.productByCategory}/>
          <Products filterNames = {this.props.productByCategory} products = {this.props.products}/>
        </div>
      </div>
    )
  }
}

//filter filtering the products
class ProductFilter extends Component {
  componentDidMount() {
    $(document).ready(function(){
      $('.filter-wrapper').sticky({topSpacing:60});
    });
  }
  render() {
    var filterName = this.props.filterNames.map(function(filter, index){
      return(
        <li key = {index} className="filter-title">
          <CheckBox id= {"filter-" + index} defaultChecked={true}>
            {filter.name}
          </CheckBox>
        </li>
      )
    });
    return(
      <div className="filter-wrapper">
        <ul className="product-filter">
          <li className="filter-title">
            <h3>Search</h3>
          </li>
          <li className="filter-search">
            <SearchBar/>
          </li>
          <li className="filter-title">
            <h3>Category</h3>
          </li>
          {filterName}
        </ul>
      </div>
    )
  }
}

//all the product display
class Products extends Component {
  render() {
    var allProducts = this.props.products;
    var productByCategory = this.props.filterNames.map(function(filter, index){
      var products = allProducts.map(function(product, index){
        return (
          product.category_id === filter.id?
          <li key= {product.id} className="product-cell">
            <ItemImg productName={product.name}/>
            <a href="#"><h5>{product.name}</h5></a>
          </li>
          : null
        )
      });
      return (
        <ul key = {index} className="product-row">
          <li className="product-title">
            <h3>{filter.name.toUpperCase()}</h3>
          </li>
          {products}
        </ul>
      )
    });
    return (
      <div className="products">
        <div className="products-by-category">
          {productByCategory}
        </div>
      </div>
    )
  }
}

class ItemImg extends Component {
  render() {
    var style = {
      width: '100px',
      height: '100px',
      borderRadius: '10px'
    };
    return (
      <a href="/product"><img src={this.props.imgSrc} style={style} title= {this.props.productName + "descriptions"}/></a>
    )
  }
}


export default HomePage;
