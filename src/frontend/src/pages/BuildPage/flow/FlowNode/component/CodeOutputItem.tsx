import { Button } from "@/components/bs-ui/button";
import { Input } from "@/components/bs-ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/bs-ui/select";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const Item = ({ item, index, onUpdateItem, onDeleteItem }) => {
    const handleTypeChange = (newType) => {
        onUpdateItem(index, { ...item, type: newType });
    };

    const handleKeyChange = (e) => {
        onUpdateItem(index, { ...item, key: e.target.value });
    };

    return (
        <div className="flex gap-1 items-center mb-1">
            {/* key */}
            <Input value={item.key} onChange={handleKeyChange} className="h-8" />
            {/* type */}
            <Select value={item.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="max-w-32 w-24 h-8">
                    <SelectValue placeholder="数据类型" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="int">int</SelectItem>
                        <SelectItem value="float">float</SelectItem>
                        <SelectItem value="complex">complex</SelectItem>
                        <SelectItem value="bool">bool</SelectItem>
                        <SelectItem value="NoneType">NoneType</SelectItem>
                        <SelectItem value="str">str</SelectItem>
                        <SelectItem value="list">list</SelectItem>
                        <SelectItem value="tuple">tuple</SelectItem>
                        <SelectItem value="dict">dict</SelectItem>
                        <SelectItem value="set">set</SelectItem>
                        <SelectItem value="frozenset">frozenset</SelectItem>
                        <SelectItem value="range">range</SelectItem>
                        <SelectItem value="bytes">bytes</SelectItem>
                        <SelectItem value="bytearray">bytearray</SelectItem>
                        <SelectItem value="memoryview">memoryview</SelectItem>
                        <SelectItem value="function">function</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Trash2 onClick={() => onDeleteItem(index)} className="min-w-5 hover:text-red-600 cursor-pointer" />
        </div>
    );
};


export default function CodeOutputItem({ data, onChange }) {
    const [items, setItems] = useState(data.value);

    const handleAddItem = () => {
        const newItems = [...items, { key: '', type: '' }];
        setItems(newItems);
        onChange(newItems);
    };

    const handleUpdateItem = (index, newItem) => {
        const newItems = items.map((item, i) => (i === index ? newItem : item));
        setItems(newItems);
        onChange(newItems);
    };

    const handleDeleteItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        onChange(newItems);
    };

    return (
        <div>
            {items.map((item, index) => (
                <Item
                    key={index}
                    item={item}
                    index={index}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                />
            ))}
            <Button onClick={handleAddItem} variant="outline" className="border-primary text-primary mt-2 h-8">
                +添加新的出参
            </Button>
        </div>
    );
}

