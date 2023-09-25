exports.AdminPrice = async (req, res) => {
  try {
    const calculatePriceResponse = await PriceCalcultor();

    if (!calculatePriceResponse.ok) {
      return res.status(500).json({error: "error calculating"});
    }

    const {totalPrice} = await calculatePriceResponse.json();

    const discountAmount = totalPrice * 0.05;
    req.json({discountAmount});
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
};
