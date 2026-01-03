import classNames from 'classnames';

interface IProps {
    btnText: string;
    isLoading?: boolean;
    btnClass?: string[];
    hasDivWrap?: boolean;
    onSubmit?: () => void;
}

export default function UpdateButton({
    btnText,
    isLoading = false,
    btnClass = [],
    hasDivWrap = true,
    onSubmit,
}: IProps) {
    return hasDivWrap ? (
        <div className="float-end">
            <button
                className={classNames('btn btn-primary waves-effect waves-float waves-light', btnClass)}
                disabled={isLoading}
                onClick={onSubmit}
            >
                {isLoading && <span className="spinner-border spinner-border-sm" />}
                <span className="ms-25 align-middle">{btnText}</span>
            </button>
        </div>
    ) : (
        <button
            className={classNames('btn btn-primary waves-effect waves-float waves-light', btnClass)}
            disabled={isLoading}
            onClick={onSubmit}
        >
            {isLoading && <span className="spinner-border spinner-border-sm" />}
            <span className="ms-25 align-middle">{btnText}</span>
        </button>
    );
}
