/**
 * TypeScript definitions for VirtualScroller Web Component
 */

export interface VirtualScrollerItemRenderEvent extends CustomEvent {
  detail: {
    index: number;
    element: HTMLElement;
    data: any;
  };
}

export interface VisibleRange {
  startIndex: number;
  endIndex: number;
}

export declare class VirtualScroller extends HTMLElement {
  /**
   * Array of data items to be rendered
   */
  items: any[];

  /**
   * Map storing the measured height of each rendered item
   */
  itemHeights: Map<number, number>;

  /**
   * Default height for items before measurement (in pixels)
   * @default 50
   */
  defaultItemHeight: number;

  /**
   * Number of items to render outside the visible viewport
   * @default 3
   */
  overscan: number;

  /**
   * Current scroll position
   */
  scrollTop: number;

  /**
   * Height of the scroller container
   */
  containerHeight: number;

  /**
   * Set the data items to be rendered
   * @param items - Array of data items
   */
  setItems(items: any[]): void;

  /**
   * Get the template HTML from the slot
   * @returns The template HTML string
   */
  getTemplate(): string;

  /**
   * Calculate the vertical offset for an item at the given index
   * @param index - The item index
   * @returns The offset in pixels
   */
  getItemOffset(index: number): number;

  /**
   * Get the height of an item (measured or default)
   * @param index - The item index
   * @returns The height in pixels
   */
  getItemHeight(index: number): number;

  /**
   * Calculate the total height of all items
   * @returns Total height in pixels
   */
  getTotalHeight(): number;

  /**
   * Find the index of the first visible item
   * @returns The start index
   */
  findStartIndex(): number;

  /**
   * Find the index of the last visible item
   * @param startIndex - The start index to begin searching from
   * @returns The end index
   */
  findEndIndex(startIndex: number): number;

  /**
   * Render a single item
   * @param index - The item index
   * @param data - The item data
   * @returns The rendered HTMLElement
   */
  renderItem(index: number, data: any): HTMLElement;

  /**
   * Update the rendered items based on current scroll position
   */
  requestUpdate(): void;

  /**
   * Scroll to a specific item by index
   * @param index - The item index to scroll to
   */
  scrollToIndex(index: number): void;

  /**
   * Get the currently visible items range
   * @returns Object with startIndex and endIndex
   */
  getVisibleRange(): VisibleRange;

  /**
   * Event listener for item render events
   */
  addEventListener(
    type: 'itemrender',
    listener: (event: VirtualScrollerItemRenderEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'virtual-scroller': VirtualScroller;
  }
}

export default VirtualScroller;
