import React, { useEffect, useState, useCallback } from "react";
import {
  render,
  useCartLines,
  useApplyCartLinesChange,
  useApplyMetafieldsChange,
  BlockStack,
  useExtensionApi,
} from "@shopify/checkout-ui-extensions-react";
import { Horizontal } from "./components/Horizontal";

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const lines = useCartLines();
  const applyCartLinesChange = useApplyCartLinesChange();
  const applyMetafieldsChange = useApplyMetafieldsChange();
  const { query } = useExtensionApi();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleError = useCallback((error) => {
    console.error(error);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }, []);

  const handlePress = useCallback(async (variantId, discountedPrice) => {
    try {
      setAdding(variantId);
      const result = await applyCartLinesChange({
        type: "addCartLine",
        merchandiseId: variantId,
        quantity: 1,
        cost: { totalAmount: discountedPrice }
      });
      if (result.type === "error") {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setAdding(null);
    }
  }, [applyCartLinesChange, handleError]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await query(
          `query ($first: Int!) {
            products(first: $first) {
              nodes {
                id
                title
                images(first:1){
                  nodes {
                    url
                  }
                }
                variants(first: 1) {
                  nodes {
                    id
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }`,
          { variables: { first: 3 } }
        );
        setProducts(data.products.nodes);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query, handleError]);

  // TODO : REMOVE ALREADY ADDED PRODUCTS , This doesnt work
  // filteredProducts = products.filter((product) => {
  //   return !lines.some((line) => line.merchandise.id === product.variants.nodes[0].id);
  // });

  return products.length == 0 ? null : (
    <BlockStack spacing="loose">
      <Horizontal
        loading={loading}
        products={products}
        adding={adding}
      />
    </BlockStack>
  );
}

export default App;
