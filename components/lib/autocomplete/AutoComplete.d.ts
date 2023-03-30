/**
 *
 * AutoComplete is an input component that provides real-time suggestions while being typed.
 *
 * [Live Demo](https://www.primevue.org/autocomplete/)
 *
 * @module autocomplete
 *
 */
import { HTMLAttributes, InputHTMLAttributes, VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';
import { VirtualScrollerItemOptions, VirtualScrollerProps } from '../virtualscroller';

/**
 * Custom change event.
 * @see {@link AutoCompleteEmits.change}
 */
export interface AutoCompleteChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected option value
     */
    value: any;
}

/**
 * Custom item select event.
 * @see {@link AutoCompleteEmits['item-select']}
 */
export interface AutoCompleteItemSelectEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Selected item
     */
    value: any;
}

/**
 * Custom item unselect event.
 * @see {@link AutoCompleteEmits['item-unselect']}
 * @extends AutoCompleteItemSelectEvent
 */
export interface AutoCompleteItemUnselectEvent extends AutoCompleteItemSelectEvent {}

/**
 * Custom dropdown click event.
 * @see {@link AutoCompleteEmits['dropdown-click']}
 */
export interface AutoCompleteDropdownClickEvent {
    /**
     * Browser mouse event
     */
    originalEvent: MouseEvent;
    /**
     * Current value of the input field
     */
    query: string;
}

/**
 * Custom complete event.
 * @see {@link AutoCompleteEmits.complete}
 */
export interface AutoCompleteCompleteEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Value to search with
     */
    query: string;
}

/**
 * Defines valid properties in AutoComplete component.
 */
export interface AutoCompleteProps {
    /**
     * Value of the component.
     */
    modelValue?: any;
    /**
     * An array of suggestions to display.
     */
    suggestions?: any[];
    /**
     * @deprecated since v3.16.0. Use 'optionLabel' property instead.
     * Property name or getter function of a suggested object to resolve and display.
     */
    field?: string | ((data: any) => string) | undefined;
    /**
     * Property name or getter function to use as the label of an option.
     */
    optionLabel?: string | ((data: any) => string) | undefined;
    /**
     * Property name or getter function to use as the disabled flag of an option, defaults to false when not defined.
     */
    optionDisabled?: string | ((data: any) => boolean) | undefined;
    /**
     * Property name or getter function to use as the label of an option group.
     */
    optionGroupLabel?: string | ((data: any) => string) | undefined;
    /**
     * Property name or getter function that refers to the children options of option group.
     */
    optionGroupChildren?: string | ((data: any) => any[]) | undefined;
    /**
     * Maximum height of the suggestions panel.
     * @defaultValue 200px
     */
    scrollHeight?: string | undefined;
    /**
     * Displays a button next to the input field when enabled.
     * @defaultValue false
     */
    dropdown?: boolean | undefined;
    /**
     * Specifies the behavior dropdown button. Default 'blank' mode sends an empty string and 'current' mode sends the input value.
     * @defaultValue blank
     */
    dropdownMode?: 'blank' | 'current' | undefined;
    /**
     * @deprecated since v3.16.0
     * Highlights automatically the first item of the dropdown to be selected.
     * @defaultValue false
     */
    autoHighlight?: boolean | undefined;
    /**
     * Specifies if multiple values can be selected.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * Default text to display when no option is selected.
     */
    placeholder?: string | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * A property to uniquely identify an option.
     */
    dataKey?: string | undefined;
    /**
     * Minimum number of characters to initiate a search.
     * @defaultValue 1
     */
    minLength?: number | undefined;
    /**
     * Delay between keystrokes to wait before sending a query.
     * @defaultValue 300
     */
    delay?: number | undefined;
    /**
     * A valid query selector or an HTMLElement to specify where the overlay gets attached.
     * Special keywords are 'body' for document body and 'self' for the element itself.
     * @defaultValue body
     */
    appendTo?: 'body' | 'self' | string | undefined | HTMLElement;
    /**
     * When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions.
     * @defaultValue false
     */
    forceSelection?: boolean | undefined;
    /**
     * Whether to run a query when input receives focus.
     * @defaultValue false
     */
    completeOnFocus?: boolean | undefined;
    /**
     * Identifier of the underlying input element.
     */
    inputId?: string | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: object | undefined;
    /**
     * Style class of the input field.
     */
    inputClass?: string | object | undefined;
    /**
     * Uses to pass all properties of the HTMLInputElement to the focusable input element inside the component.
     */
    inputProps?: InputHTMLAttributes | undefined;
    /**
     * Inline style of the overlay panel.
     */
    panelStyle?: object | undefined;
    /**
     * Style class of the overlay panel.
     */
    panelClass?: string | object | undefined;
    /**
     * Uses to pass all properties of the HTMLDivElement to the overlay panel inside the component.
     */
    panelProps?: HTMLAttributes | undefined;
    /**
     * Icon to display in the dropdown.
     * @defaultValue pi pi-chevron-down
     */
    dropdownIcon?: string | undefined;
    /**
     * Style class of the dropdown button.
     */
    dropdownClass?: string | object | undefined;
    /**
     * Icon to display in loading state.
     * @defaultValue pi pi-spinner pi-spin
     */
    loadingIcon?: string | undefined;
    /**
     * Icon to display in chip remove action.
     * @defaultValue pi pi-times-circle
     */
    removeTokenIcon?: string | undefined;
    /**
     * Whether to use the virtualScroller feature. The properties of VirtualScroller component can be used like an object in it.
     * @type {VirtualScrollerProps}
     */
    virtualScrollerOptions?: VirtualScrollerProps;
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @defaultValue true
     */
    autoOptionFocus?: boolean | undefined;
    /**
     * When enabled, the focused option is selected.
     * @defaultValue false
     */
    selectOnFocus?: boolean | undefined;
    /**
     * Locale to use in searching. The default locale is the host environment's current locale.
     */
    searchLocale?: string | undefined;
    /**
     * Text to be displayed in hidden accessible field when filtering returns any results. Defaults to value from PrimeVue locale configuration.
     * @defaultValue '{0} results are available'
     */
    searchMessage?: string | undefined;
    /**
     * Text to be displayed in hidden accessible field when options are selected. Defaults to value from PrimeVue locale configuration.
     * @defaultValue '{0} items selected'
     */
    selectionMessage?: string | undefined;
    /**
     * Text to be displayed in hidden accessible field when any option is not selected. Defaults to value from PrimeVue locale configuration.
     * @defaultValue No selected item
     */
    emptySelectionMessage?: string | undefined;
    /**
     * Text to display when filtering does not return any results. Defaults to value from PrimeVue locale configuration.
     * @defaultValue No results found
     */
    emptySearchMessage?: string | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabindex?: number | string | undefined;
    /**
     * Defines a string value that labels an interactive element.
     */
    'aria-label'?: string | undefined;
    /**
     * Identifier of the underlying input element.
     */
    'aria-labelledby'?: string | undefined;
}

/**
 * Defines valid slots in AutoComplete component.
 * @todo Next release we should complete types for all slots
 */
export interface AutoCompleteSlots {
    /**
     * Custom chip template.
     * @param {Object} scope - chip slot's params.
     */
    chip(scope: {
        /**
         * A value in the selection
         */
        value: any;
    }): VNode[];
    /**
     * Custom header template of panel.
     * @param {Object} scope - header slot's params.
     */
    header(scope: {
        /**
         * Value of the component
         */
        value: any;
        /**
         * Displayed options
         */
        suggestions: any[];
    }): VNode[];
    /**
     * Custom footer template of panel.
     * @param {Object} scope - footer slot's params.
     */
    footer(scope: {
        /**
         * Value of the component
         */
        value: any;
        /**
         * Displayed options
         */
        suggestions: any[];
    }): VNode[];
    /**
     * @deprecated since v3.16.0
     * Custom content for each item.
     * @param {Object} scope - item slot's params.
     */
    item(scope: {
        /**
         * Option instance
         */
        item: any;
        /**
         * Index of the option
         */
        index: number;
    }): VNode[];
    /**
     * Custom option template.
     * @param {Object} scope - option slot's params.
     */
    option(scope: {
        /**
         * Option instance
         */
        option: any;
        /**
         * Index of the option
         */
        index: number;
    }): VNode[];
    /**
     * Custom option group template.
     * @param {Object} scope - option group slot's params.
     */
    optiongroup(scope: {
        /**
         * @deprecated since v3.16.0. Use the 'option' instead.
         * Option instance
         */
        item: any;
        /**
         * Option instance
         */
        option: any;
        /**
         * Index of the option
         */
        index: number;
    }): VNode[];
    /**
     * Custom panel template.
     * @param {Object} scope - content slot's params.
     */
    content(scope: {
        /**
         * An array of objects to display for virtualscroller
         */
        items: any;
        /**
         * Style class of the component
         */
        styleClass: string;
        /**
         * Referance of the content
         * @param {HTMLElement} el - Element of 'ref' property
         */
        contentRef(el: any): void;
        /**
         * Options of the items
         * @param {number} index - Rendered index
         * @return {VirtualScrollerItemOptions}
         */
        getItemOptions(index: number): VirtualScrollerItemOptions;
    }): VNode[];
    /**
     * Custom loader template.
     * @param {Object} scope - loader slot's params.
     */
    loader(scope: {
        /**
         * Options of the loader items for virtualscroller
         */
        options: any[];
    }): VNode[];
    /**
     * Custom empty template when there is no data to display.
     */
    empty(): VNode[];
}

/**
 * Defines valid emits in AutoComplete component.
 */
export interface AutoCompleteEmits {
    /**
     * Emitted when the value changes.
     * @param {*} value - New value.
     */
    'update:modelValue'(value: any): void;
    /**
     * Callback to invoke on value change.
     * @param {AutoCompleteChangeEvent} event - Custom change event.
     */
    change(event: AutoCompleteChangeEvent): void;
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     */
    focus(event: Event): void;
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     */
    blur(event: Event): void;
    /**
     * Callback to invoke when a suggestion is selected.
     * @param {AutoCompleteItemSelectEvent} event - Custom item select event.
     */
    'item-select'(event: AutoCompleteItemSelectEvent): void;
    /**
     * Callback to invoke when a selected value is removed.
     * @param {AutoCompleteItemUnselectEvent} event - Custom item unselect event.
     */
    'item-unselect'(event: AutoCompleteItemUnselectEvent): void;
    /**
     * Callback to invoke to when dropdown button is clicked.
     * @param {AutoCompleteDropdownClickEvent} event - Custom dropdown click event.
     */
    'dropdown-click'(event: AutoCompleteDropdownClickEvent): void;
    /**
     * Callback to invoke when input is cleared by the user.
     */
    clear(): void;
    /**
     * Callback to invoke to search for suggestions.
     * @param {AutoCompleteCompleteEvent} event - Custom complete event.
     */
    complete(event: AutoCompleteCompleteEvent): void;
    /**
     * Callback to invoke before the overlay is shown.
     */
    'before-show'(): void;
    /**
     * Callback to invoke before the overlay is hidden.
     */
    'before-hide'(): void;
    /**
     * Callback to invoke when the overlay is shown.
     */
    show(): void;
    /**
     * Callback to invoke when the overlay is hidden.
     */
    hide(): void;
}

/**
 * **PrimeVue - AutoComplete**
 *
 * _AutoComplete is an input component that provides real-time suggestions while being typed._
 *
 * [Live Demo](https://www.primevue.org/autocomplete/)
 * --- ---
 * ![PrimeVue](https://primefaces.org/cdn/primevue/images/logo-100.png)
 *
 * @group Component
 *
 */
declare class AutoComplete extends ClassComponent<AutoCompleteProps, AutoCompleteSlots, AutoCompleteEmits> {}

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        AutoComplete: GlobalComponentConstructor<AutoComplete>;
    }
}

export default AutoComplete;