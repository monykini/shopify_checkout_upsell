import React, { useEffect, useState, useCallback } from "react";
import {
  render,
  useApplyCartLinesChange,
  BlockStack,
  useExtensionApi,
  Style
} from "@shopify/checkout-ui-extensions-react";
import { Horizontal } from "./components/Horizontal";
import { HorizontalMobile } from "./components/HorizontalMobile";

function App() {
  const applyCartLinesChange = useApplyCartLinesChange();
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

  const hideOnMobile = Style.default(0).when({viewportInlineSize: {min: 'small'}}, 0).when({viewportInlineSize: {min: 'medium'}}, '100%').when({viewportInlineSize: {min: 'large'}}, '100%');
  const hideOnDesktop = Style.when({viewportInlineSize: {min: 'small'}}, '100%').when({viewportInlineSize: {min: 'medium'}}, 0).when({viewportInlineSize: {min: 'large'}}, 0);

  const handlePress = useCallback(async (variantId, discountedPrice) => {
    setAdding(variantId);
    try {
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
      setLoading(true);
      try {
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
  // Can be better
  products.map((product) => {
    product.onPress = handlePress;
  })

  return products.length === 0 ? null : (
    <>
      <BlockStack spacing="loose" overflow={"hidden"} maxInlineSize={hideOnMobile}	maxBlockSize={hideOnMobile}>
        <Horizontal
          loading={loading}
          products={products}
          adding={adding}
        />
      </BlockStack>
      <BlockStack  overflow={"hidden"} maxInlineSize={hideOnDesktop}	maxBlockSize={hideOnDesktop}>
        <HorizontalMobile
          loading={loading}
          products={products}
          adding={adding}
        />
      </BlockStack>
    </>
  );
}

export default App;

render('Checkout::Dynamic::Render', () => <App />);
