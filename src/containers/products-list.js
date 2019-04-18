import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductsList extends React.Component {
  renderProducts() {
    const { products } = this.props;
    return _.map(products, product => {
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.weight}</td>
          <td>{product.availability}</td>
          <td>
            {product["isEditable"] ? (
              <Link className="btn btn-primary" to={`/edit-product/${product.id}`}>
                Edit
              </Link>
            ) : null}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Products</h3>
        <div style={{ paddingTop: 20 }}>
          <table className="table">
            <tbody>{this.renderProducts()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(ProductsList);
