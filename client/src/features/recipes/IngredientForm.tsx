import { useState } from 'react';

const IngredientForm = () => {
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("");
    const [text, setText] = useState("");
    const [comment, setComment] = useState("");

    return (
        <fieldset>
            <input
                type="number"
                id="amount"
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="text"
                id="unit"
                placeholder="g"
                onChange={(e) => setUnit(e.target.value)}
                value={unit}
                required
            />
            <input
                type="text"
                id="text"
                placeholder="Flour"
                onChange={(e) => setText(e.target.value)}
                value={text}
                required
            />
            <input
                type="text"
                id="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
        </fieldset>
    )
}

export default IngredientForm