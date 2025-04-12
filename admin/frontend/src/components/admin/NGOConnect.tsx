import React, { useState } from 'react';

const ngos = [
    {
        name: 'Shubhoday Trust',
        address: 'No.544/14, 7th Cross, 1st Main Road, Gokula 1st Stage, 2nd Phase, Yeshwanthpur, Bangalore-560022',
        phone: '080-23473373 / 9916265003',
        website: 'http://shubhodayatrust.org',
        email: '',
        categories: ['Education & Literacy', 'Health & Family Welfare', 'Women’s Development & Empowerment'],
    },
    {
        name: 'Manav Charities Society',
        address: '66, 14th Main, Kammagondanhalli, Jalahalli West, Bangalore-560015',
        phone: '080-23454878 / 9342358091',
        website: 'http://manavcharities.in',
        email: 'rajkul_2000@yahoo.com',
        categories: ['Education & Literacy', 'Health & Family Welfare', 'Women’s Development & Empowerment'],
    },
    {
        name: 'Provision Asia Trust',
        address: '727, 2nd Main, 2nd Cross, Chinnanna Layout, Kaval Byrasandra R.T Nagar Post, Bangalore 560032',
        phone: '080-23634312',
        website: 'http://provisionasia.org',
        email: 'info@provisionasia.org',
        categories: ['Education & Literacy', 'Health & Family Welfare', 'Women’s Development & Empowerment'],
    },
    {
        name: 'Assisted Living For Autistic Adults (ALFAA)',
        address: 'No 9, Omega Avenue, Mathrushree Layout, MARAGONDANAHALLI MAIN ROAD, TC Palya, KR Puram, Bangalore 560036',
        phone: '080-25567762 / 9741418103',
        website: 'http://alfaa.org.in',
        email: 'alfaa2010@gmail.com',
        categories: ['Health & Family Welfare'],
    },
    {
        name: 'Adamya Chetana Foundation',
        address: 'Bangalore, India',
        phone: '',
        website: 'https://en.wikipedia.org/wiki/Adamya_Chethana_Foundation',
        email: '',
        categories: ['Education & Literacy', 'Health & Family Welfare', 'Women’s Development & Empowerment'],
    },
    {
        name: 'The/Nudge Foundation',
        address: 'Rigel, 7, Chinnapanahalli Main Rd, Ward Number 85, Dodda Nekkundi Extension, Doddanekkundi, Bengaluru, Karnataka 560037',
        phone: '',
        website: 'https://www.thenudge.org',
        email: 'hello@thenudge.org',
        categories: ['Education & Literacy', 'Health & Family Welfare'],
    },
    {
        name: 'Diya Foundation',
        address: 'Bangalore, India',
        phone: '',
        website: '',
        email: '',
        categories: ['Education & Literacy'],
    },
    {
        name: 'Karunashraya',
        address: 'Bangalore, India',
        phone: '',
        website: '',
        email: '',
        categories: ['Health & Family Welfare'],
    },
    {
        name: 'Christel House India',
        address: 'Bangalore, India',
        phone: '',
        website: '',
        email: '',
        categories: ['Education & Literacy'],
    },
    {
        name: 'Association for Community Care, Education and Social Services (ACCESS)',
        address: 'Bangalore, India',
        phone: '',
        website: '',
        email: '',
        categories: ['Education & Literacy', 'Health & Family Welfare'],
    },
];

const allCategories = [
    'Education & Literacy',
    'Health & Family Welfare',
    'Women’s Development & Empowerment',
];

const NGOConnect = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredNgos =
        selectedCategory === 'All'
            ? ngos
            : ngos.filter((ngo) => ngo.categories.includes(selectedCategory));

    return (
        <div className="min-h-screen bg-white py-12 px-6 sm:px-10">
            <h1 className="text-4xl font-bold text-teal-600 mb-8 text-center">NGOs in Bengaluru</h1>

            {/* Category Filter */}
            <div className="mb-10 max-w-sm mx-auto">
                <label htmlFor="categoryFilter" className="block mb-2 text-sm font-medium text-teal-800">
                    Filter by Category
                </label>
                <select
                    id="categoryFilter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-teal-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-400"
                >
                    {allCategories.map((category) => (
                        <option key={category} value={category} className="text-sm">
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* NGO List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNgos.map((ngo, index) => (
                    <div
                        key={index}
                        className="bg-teal-50 border border-teal-200 rounded-xl p-6 shadow hover:shadow-md transition duration-300"
                    >
                        <h2 className="text-xl font-semibold text-teal-700">{ngo.name}</h2>
                        <p className="text-sm text-gray-700 mt-2">{ngo.address}</p>
                        <p className="text-sm text-gray-700">
                            <strong>Phone:</strong> {ngo.phone || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Email:</strong> {ngo.email || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Website:</strong>{' '}
                            {ngo.website ? (
                                <a
                                    href={ngo.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-teal-600 underline"
                                >
                                    Visit
                                </a>
                            ) : (
                                'N/A'
                            )}
                        </p>
                        <div className="mt-3">
                            {ngo.categories.map((cat, i) => (
                                <span
                                    key={i}
                                    className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full mr-2 mt-1"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NGOConnect;
