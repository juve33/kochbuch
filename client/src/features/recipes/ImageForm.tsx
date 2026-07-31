import { useState, useEffect } from 'react';

import type { FieldsetFormProps } from '../../utils/FieldsetFormProps';
import AddButton from '../../components/AddButton';

type ImageFormProps =
    Omit<FieldsetFormProps<Image>,
    "value"> & {
    value?: Image;
    slot: number;
}

export type Image = {
    id: number;
    apiId?: number;
    slot: number;
    url?: string;
    file?: File;
    caption?: string;
    fileWasChanged: boolean;
};

const ImageForm = ({ value, slot, index, setAction }: ImageFormProps) => {
    const [addingCaption, setAddingCaption] = useState<boolean>(false);

    const [error, setError] = useState("");

    useEffect(() => {
        setAddingCaption(value?.caption ? true : false);
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");

        try {
            const file = e.target.files?.[0];

            if (!file) {
                setAction(prev => {
                    const next = [...prev];

                    next.splice(index, 1);

                    return next;
                });
                return;
            }

            if (!file.type.startsWith("image/")) {
                throw new Error("Please select an image.");
            }

            setAction(prev => {
                const next = [...prev];

                next[index] = {
                    ...next[index],
                    url: URL.createObjectURL(file),
                    file: file,
                    fileWasChanged: true
                };

                return next;
            });
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error";
            setError(message);
        }
    }
    
    return (
        (value === undefined) ?
        <AddButton
            createItem={(): Image => ({
                id: Date.now(),
                slot: slot,
                fileWasChanged: false
            })}
            setAction={setAction}
        />
        :
        <div className='input-recipe-image__wrapper recipe-image'>
            <div className='input-recipe-image__inner'>
                <label className='input-recipe-image__image' htmlFor={"image-" + index}>
                    <input
                        type="file"
                        accept='image/png, image/jpeg, image/webp'
                        id={"image-" + index}
                        onChange={handleFileChange}
                    />
                    {value.url && <img src={value.url} />}
                </label>
                {value.url &&
                    <div className='input-recipe-image__controls'>
                        <button
                            type='button'
                            aria-label={((addingCaption) ? "Remove" : "Add") + " caption"}
                            onClick={() => {
                                if (addingCaption) {
                                    setAction(prev => {
                                        const next = [...prev];

                                        next[index] = {
                                            ...next[index],
                                            caption: undefined,
                                        };

                                        return next;
                                    });
                                }
                                setAddingCaption(!addingCaption);
                            }}
                        ></button>
                        <button
                            type='button'
                            aria-label='Remove image'
                            onClick={() => {
                                setAction(prev => {
                                    const next = [...prev];

                                    next.splice(index, 1);

                                    return next;
                                });
                            }}
                        ></button>
                    </div>
                }
            </div>
            {error && <p>{error}</p>}
            {(addingCaption) &&
                <>
                    <label htmlFor={"image-caption-" + index} id={"image-caption-label-" + index}>Caption:</label>
                    <input
                        type='text'
                        aria-labelledby={"image-caption-label-" + index}
                        value={value.caption ?? undefined}
                        onChange={(e) => {
                            setAction(prev => {
                                const next = [...prev];

                                next[index] = {
                                    ...next[index],
                                    caption: e.target.value,
                                };
                                console.log(next[index]);
                                return next;
                            });
                        }}
                    />
                </>
            }
        </div>
    )
}

export default ImageForm