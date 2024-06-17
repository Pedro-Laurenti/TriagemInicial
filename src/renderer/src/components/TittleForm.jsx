import React from 'react'

export default function TittleForm({Tittle}) {
    return (
        <h2 className="w-full py-2 bg-slate-700 text-white text-center font-semibold">
            {Tittle}
        </h2>
    )
}

export function SubtittleForm({SubTittle}) {
    return (
        <h3 className="mb-3 text-xl">
            {SubTittle}
        </h3>
    )
}

