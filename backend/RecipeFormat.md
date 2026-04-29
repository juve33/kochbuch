# Recipe Format

```json
{
    "name": string,
    "id": number,
    "category_name": string,
    "images": [
        {
            "id": number,
            "slot": number,
            "caption": string,
            "location": string
        }
    ],
    "ingredients": [
        {
            "id": number,
            "amount": number,
            "unit": string,
            "text": string,
            "step_id": number
        }
    ],
    "steps": [
        {
            "id": number,
            "index_number": number,
            "text": string
        }
    ]
}
```