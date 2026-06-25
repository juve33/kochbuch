import type { FieldsetFormProps } from '../../utils/FieldsetFormProps';

export type Step = {
    id: number;
    apiId?: number;
    text: string;
};

const StepForm = ({ value, index, setAction }: FieldsetFormProps<Step>) => {
    return (
        <div className='input-item-form input-item-form-steps'>
            <div>
                {index + 1}
            </div>
            <textarea
                id="text"
                onChange={(e) => {
                    setAction(prev => {
                        const next = [...prev];

                        prev[index].text = e.target.value;

                        return next;
                    });
                }}
                value={value.text}
                required
            />
        </div>
    )
}

export default StepForm