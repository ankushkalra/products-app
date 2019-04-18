import React from "react";
import { connect } from "react-redux";
import { pricingInfo } from "../products";
import { updateProduct } from "../actions";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      weight: "",
      availability: 0,
      productUrl: "",
      pricingTier: "",
      priceRange: "",
      isEditable: null
    };
  }

  componentDidMount() {
    const { products, match } = this.props;
    const product = products[match.params.id];
    const { id, name, weight, availability, productUrl, pricingTier, priceRange, isEditable } = product;
    this.setState({ id, name, weight, availability, productUrl, pricingTier, priceRange, isEditable });
  }

  onChange = (field, value) => {
    this.setState({ [field]: value });
  };

  validate = data => {
    const error = {};
    const { name, weight, productUrl, pricingTier, priceRange, isEditable } = data;
    if (!name) {
      error.name = "Name is required";
    }
    if (!weight) {
      error.weight = "Weight is required";
    }
    if (!productUrl) {
      error.weight = "Product Url is required";
    }
    if (!pricingTier) {
      error.weight = "Price Tier is required";
    }
    if (!priceRange) {
      error.priceRange = "Price Range is required";
    }
    if (isEditable !== true && isEditable !== false) {
      error.isEditable = "Is Editable in required";
    }
    return error;
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state);
    const errorValues = Object.values(errors);
    if (errorValues.length) {
      alert(errorValues[0]);
    } else {
      this.props.updateProduct(this.state);
      this.props.history.push("/");
    }
  };

  render() {
    const { name, weight, availability, productUrl, pricingTier, priceRange, isEditable } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="lead">Edit Product</div>
          <InputText field="name" value={name} label="Name" onChange={value => this.onChange("name", value)} />
          <InputText field="weight" value={weight} label="Weight" onChange={value => this.onChange("weight", value)} />
          <InputText
            field="availability"
            value={availability}
            label="Availability"
            onChange={value => this.onChange("availability", value)}
          />
          <InputText
            field="productUrl"
            value={productUrl}
            label="Product Url"
            onChange={value => this.onChange("productUrl", value)}
          />
          <Radio
            label="Price Tier"
            options={["budget", "premier"]}
            value={pricingTier}
            onChange={value => this.onChange("pricingTier", value)}
          />

          <Select
            options={pricingTier ? pricingInfo[pricingTier] : []}
            value={priceRange}
            onChange={value => this.onChange("priceRange", value)}
          />

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              checked={isEditable}
              onChange={e => {
                this.onChange("isEditable", e.target.checked);
              }}
              id="defaultCheck1"
            />
            <label class="form-check-label" for="defaultCheck1">
              Is Editable
            </label>
          </div>
          <Button text="Save" type="submit" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({ products: state.products }),
  { updateProduct }
)(EditProduct);

class InputText extends React.Component {
  handleChange = e => {
    const value = e.target.value;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { field, label, value } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        <input name={field} type="text" className="form-control" value={value} onChange={this.handleChange} />
      </div>
    );
  }
}

class Select extends React.Component {
  handleChange = e => {
    const value = e.target.value;
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { options, label, value } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        <select value={value} onChange={this.handleChange} className="custom-select">
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

class Radio extends React.Component {
  onSelect = option => {
    const { onChange } = this.props;
    onChange(option);
  };
  render() {
    const { options, label, value } = this.props;

    return (
      <div className="form-group">
        <label>{label}</label>
        <br />
        {options.map(option => (
          <div key={option} onClick={() => this.onSelect(option)} className="form-check form-check-inline">
            <input id={option} checked={option === value} className="form-check-input" type="radio" value={option} />
            <label className="form-check-label">{option}</label>
          </div>
        ))}
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    const { text, type, onClick } = this.props;
    let optionalProps = {};
    if (type) {
      optionalProps.type = type;
    }
    return (
      <button
        style={{ marginTop: 20, marginBottom: 20 }}
        className="btn btn-block btn-primary"
        {...optionalProps}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}
