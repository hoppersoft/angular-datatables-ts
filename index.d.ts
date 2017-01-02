declare var _: string;
export = _;

import * as angular from 'angular';

declare module 'angular'
{
    namespace dataTables {
        interface AjaxResults<T> {
            /**
            * The draw counter that this object is a response to - from the draw
            * parameter sent as part of the data request.Note that it is strongly
            * recommended for security reasons that you cast this parameter to an
            * integer, rather than simply echoing back to the client what it sent
            * in the draw parameter, in order to prevent Cross Site Scripting (XSS)
            * attacks.
            */
            draw?: number;

            /**
            * Total records, before filtering (i.e.the total number of records in
            * the database)
            */
            recordsTotal?: number;

            /**
            * Total records, after filtering (i.e.the total number of records after
            * filtering has been applied - not just the number of records being
            * returned for this page of data).
            */
            recordsFiltered?: number;

            /**
            * The data to be displayed in the table.This is an array of data source
            * objects, one for each row, which will be used by DataTables.Note that
            * this parameter's name can be changed using the ajax option's dataSrc
            * property.
            */
            data: Array<T>;

            /**
            * Optional: If an error occurs during the running of the server-side
            * processing script, you can inform the user of this error by passing
            * back the error message to be displayed using this parameter.Do not
            * include if there is no error.
            */
            error?: string
        }

        type AjaxCallback<T> = (results: AjaxResults<T>) => void;
        type AjaxFunctionSource<T> = (data: Object, callback: AjaxCallback<T>, settings?: Object) => void;

        interface RenderMetadata {
            /**
            * The row index for the requested cell. See row().index().
            */
            row: number;

            /**
            * The column index for the requested cell.See column().index().
            */
            col: number;

            /**
            * The DataTables.Settings object for the table in question. This can be used to obtain an API instance if required.
            */
            settings: any
        }
        type RenderFunction = (data?: any, type?: string, row?: any, metadata?: RenderMetadata) => string;

        interface DTInstance {
            reloadData: (data: any, resetPaging: boolean) => void;
            changeData: (data: any) => void;
            rerender: () => void;
        }

        interface DTOptionsBuilder {
            /**
             * Create a wrapped datatables options with the ajax source set
             * @param ajax the ajax source
             * @returns {DTOptionsBuilder} a wrapped datatables option
             */
            fromSource(ajax: string): DTOptionsBuilder;

            /**
             * Add a functon that invokes an Ajax source to the options.
             * This corresponds to the "ajax" option
             * @param ajax the ajax source
             * @returns {DTOptionsBuilder} the options
             */
            fromSource<T>(ajax: AjaxFunctionSource<T>): DTOptionsBuilder;

            /**
             * Use a set of properties for jQuery $.ajax.
             * This corresponds to the "ajax" option
             * @param ajax the ajax source
             * @returns {DTOptionsBuilder} the options
             */
            fromSource(options: JQueryAjaxSettings): DTOptionsBuilder;
                    /**
            * Add the option to the datatables options
            * @param key the key of the option
            * @param value an object or a function of the option
            * @returns {DTOptionsBuilder} the options
            */
            withOption(key: string, value: any): DTOptionsBuilder;

            /**
             * Add a functon that invokes an Ajax source to the options.
             * This corresponds to the "ajax" option
             * @param ajax the ajax source
             * @returns {DTOptionsBuilder} the options
             */
            withSource<T>(ajax: AjaxFunctionSource<T>): DTOptionsBuilder;

            /**
             * Use a path to a resource as the data source.
             * This corresponds to the "ajax" option
             * @param ajax the ajax source
             * @returns {DTOptionsBuilder} the options
             */
            withSource(source: string): DTOptionsBuilder;

            /**
             * Use a set of properties for jQuery $.ajax.
             * This corresponds to the "ajax" option
             * @param ajax the ajax source
             * @returns {DTOptionsBuilder} the options
             */
            withSource(options: JQueryAjaxSettings): DTOptionsBuilder;

            /**
             * Add the ajax data properties.
             * @param sAjaxDataProp the ajax data property
             * @returns {DTOptionsBuilder} the options
             */
            withDataProp(ajaxDataProp: string): DTOptionsBuilder;

            /**
             * Set the server data function.
             * @param fn the function of the server retrieval
             * @returns {DTOptionsBuilder} the options
             */
            withFnServerData(fn: Function): DTOptionsBuilder;

            /**
             * Set the pagination type.
             * @param paginationType the pagination type
             * @returns {DTOptionsBuilder} the options
             */
            withPaginationType(paginationType: string): DTOptionsBuilder;

            /**
             * Set the language of the datatables
             * @param language the language
             * @returns {DTOptionsBuilder} the options
             */
            withLanguage(language: string): DTOptionsBuilder;

            /**
             * Set the language source
             * @param languageSource the language source
             * @returns {DTOptionsBuilder} the options
             */
            withLanguageSource(languageSource: string): DTOptionsBuilder

            /**
             * Set default number of items per page to display
             * @param displayLength the number of items per page
             * @returns {DTOptionsBuilder} the options
             */
            withDisplayLength(displayLength: number): DTOptionsBuilder

            /**
             * Set the promise to fetch the data
             * @param promise the function that returns a promise
             * @returns {DTOptionsBuilder} the options
             */
            withFnPromise<T>(promise: () => angular.IPromise<T>): DTOptionsBuilder

            /**
             * Set the Dom of the DataTables.
             * @param dom the dom
             * @returns {DTOptionsBuilder} the options
             */
            withDOM(dom: any): DTOptionsBuilder;
        }

        interface DTColumnBuilder {
            /**
            * Create a new wrapped datatables column
            * @param data the data of the column to display
            * @param title the sTitle of the column title to display in the DOM
            * @returns {DTColumn} the wrapped datatables column
            */
            newColumn(data: string, title?: string): DTColumnBuilder;

            /**
            * Add the option of the column
            * @param key the key of the option
            * @param value an object or a function of the option
            * @returns {DTColumnBuilder} the wrapped datatables column
            */
            withOption(key: string, value: any): DTColumnBuilder;

            /**
            * Set the title of the colum
            * @param title the title of the column
            * @returns {DTColumnBuilder} the wrapped datatables column
            */
            withTitle(title: string): DTColumnBuilder;

            /**
            * Set the CSS class of the column
            * @param class the CSS class
            * @returns {DTColumnBuilder} the wrapped datatables column
            */
            withClass(cssClass: string): DTColumnBuilder;

            /**
            * Hide the column
            * @returns {DTColumnBuilder} the wrapped datatables column
            */
            notVisible(): DTColumnBuilder;

            /**
            * Set the column as not sortable
            * @returns {DTColumnBuilder} the wrapped datatables column
            */
            notSortable(): DTColumnBuilder;

            /**
            * Render each cell with the given parameter
            * @param renderer the string to render the data
            * @returns {DTColumnBuilder} the wrapped datatables column
            */
            renderWith(renderer: string): DTColumnBuilder;

            /**
            * Render each cell with the given parameter
            * @param renderer the function to render the data
            * @returns {DTColumnBuilder} the wrapped datatables column
            */
            renderWith(renderer: RenderFunction): DTColumnBuilder;
        }
    }
}