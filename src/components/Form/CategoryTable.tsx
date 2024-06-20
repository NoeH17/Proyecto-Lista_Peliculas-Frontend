import React from 'react';
import './CategoryTable.css';

function CategoryTable({ categories, user }: { categories: any[], user: any }) {
    return (
        <>
            {user && (
                <section className="dataContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat: any) => (
                                <tr key={cat._id}>
                                    <td>{cat.name}</td>
                                    <td>{cat.description}</td>
                                    <td>{cat._id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    );
}

export default CategoryTable;
