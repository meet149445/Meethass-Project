import ProductModel from  "../models/ProductModel.mjs";

export const createProduct = async (req, res) => {
  try {
    let product;

    if (Array.isArray(req.body)) {
      product = await ProductModel.insertMany(req.body);
    } else {
      product = await ProductModel.create(req.body);
    }

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getSingleProduct = async (
  req,
  res
) => {

  try {

    const product = await ProductModel.findById(
      req.params.id
    );

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const updateProduct = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const updatedProduct =
      await ProductModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(
      updatedProduct
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};