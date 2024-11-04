// PriceDisplay.js
import React from 'react';

function PriceDisplay({ predictedPrice }) {
  return (
    predictedPrice !== null && (
      <h3 className="mt-4 text-center">
        Predicted Price: $
        {predictedPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h3>
    )
  );
}

export default PriceDisplay;
