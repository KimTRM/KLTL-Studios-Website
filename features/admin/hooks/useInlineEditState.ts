"use client";

import { useState } from "react";

type EntityWithId = {
    _id: string;
};

export function useInlineEditState<TFields extends Record<string, string>>() {
    const [editState, setEditState] = useState<
        Record<string, Partial<TFields>>
    >({});

    function getEdited(item: EntityWithId & TFields): EntityWithId & TFields {
        return {
            ...item,
            ...(editState[item._id] ?? {}),
        };
    }

    function setField<Key extends keyof TFields & string>(
        id: string,
        field: Key,
        value: string,
    ) {
        setEditState((previous) => ({
            ...previous,
            [id]: {
                ...previous[id],
                [field]: value,
            },
        }));
    }

    function clearItem(id: string) {
        setEditState((previous) => {
            const next = { ...previous };
            delete next[id];
            return next;
        });
    }

    function isDirty(item: EntityWithId & TFields) {
        const edited = editState[item._id];
        if (!edited) return false;

        return Object.entries(edited).some(
            ([field, value]) => item[field as keyof TFields] !== value,
        );
    }

    function resetAll() {
        setEditState({});
    }

    return {
        getEdited,
        setField,
        clearItem,
        isDirty,
        resetAll,
    };
}
