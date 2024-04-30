 export interface ModalProps {
  /**
   * Modal contents
   * @type {React.ReactNode}
   * @memberof ModalProps
   * @required
   * @default null
   * @example <Modal>Modal Content</Modal>
   * @description Modal content
   **/
  children: React.ReactNode;

  /**
   * Modal title
   * @type {string}
   * @memberof ModalProps
   * @required
   * @default null
   * @example <Modal title="Modal Title">Modal Content</Modal>
   * @description Modal title
   **/
  title: string;

  /**
   * Modal subtitle
   * @type {string}
   * @memberof ModalProps
   * @optional
   * @default null
   * @example <Modal subtitle="Modal Subtitle">Modal Content</Modal>
   * @description Modal subtitle
   **/
  subtitle?: string;

  /**
   * Modal action
   * @type {Function}
   * @memberof ModalProps
   * @optional
   * @default null
   * @example <Modal action={() => console.log("Modal Action")} actionName="Modal Action">Modal Content</Modal>
   * @description Modal action
   * @note This is a function that will be called when the action button is clicked
   **/
  action?: () => void;

  /**
   * Modal action name
   * @type {string}
   * @memberof ModalProps
   * @optional
   * @default null
   * @example <Modal action={() => console.log("Modal Action")} actionName="Modal Action">Modal Content</Modal>
   * @description Modal action name
   * @note This is the name of the action button
   **/
  actionName?: string;

  /**
   * Modal class name
   * @type {string}
   * @memberof ModalProps
   * @optional
   * @default null
   * @example <Modal className="custom-class">Modal Content</Modal>
   * @description Modal class name
   * @note This is the name of the action button
   **/
  className?: string;

  /**
   * Modal size
   * @type {string}
   * @memberof ModalProps
   * @optional
   * @default regular
   * @example <Modal size="small">Modal Content</Modal>
   * @description Modal size
   **/
  size?: "small" | "regular" | "large";

  /**
   * Modal close handler
   * @type {Function}
   * @memberof ModalProps
   * @required
   * @default null
   * @example <Modal onModalClose={() => console.log("Modal Closed")}>Modal Content</Modal>
   * @description Modal close handler
   * @note This is a function that will be called when the modal is closed
   **/
  onModalClose: () => void;

  loading?: boolean
}
