import { useRef, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router';

export const useProductsSearch = () => {
  /**
   * Reusable hook to handle search products
   **/
  const [_searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    /**
     * Updates the URL search parameters when the user presses the 'Enter' key.
     *
     * Replaces the current URL search parameters with a new set containing only
     * the 'query' parameter. If the input is empty, the 'query' parameter is
     * removed, resulting in a URL with no search parameters. The UI also clears the
     * current filters
     *
     * @param event - The keyboard event triggered by the search input.
     */
    if (event.key !== 'Enter') return;
    const newSearchParams = new URLSearchParams();

    const query = inputRef.current?.value;
    if (!query) {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', inputRef.current!.value);
    }

    setSearchParams(newSearchParams);
  };

  return {
    inputRef,
    handleInputSearch,
  };
};
