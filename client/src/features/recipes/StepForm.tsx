import type { FieldsetFormProps } from '../../utils/FieldsetFormProps';

export type Step = {
  id: number;
  text: string;
};

const StepForm = ({ value, index, setAction }: FieldsetFormProps<Step>) => {
    return (
        <>
            <div>
                {index + 1}
            </div>
            <textarea
                id="text"
                placeholder="Stir"
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
        </>
    )
}

export default StepForm