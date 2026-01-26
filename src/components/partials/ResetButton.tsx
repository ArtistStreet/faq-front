interface IProps {
     btnText: string;
     isLoading?: boolean;
     handleReset: () => void;
}

export default function ResetButton({ btnText, isLoading = false, handleReset }: Readonly<IProps>) {
     return (
          <button className="btn btn-outline-secondary waves-effect" disabled={isLoading} onClick={handleReset}>
               {isLoading && <span className="spinner-border spinner-border-sm" />}
               <span className="ms-25 align-middle">{btnText}</span>
          </button>
     );
}
