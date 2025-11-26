import React from 'react';

export const AttestationTravail = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Attestation de Travail
      </h1>
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl mx-auto">
        <label className="block text-lg font-medium mb-3">Matricule</label>
        <input
          type="text"
          placeholder="Entrez votre matricule"
          className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
        />
        <div className="flex justify-center gap-8 mt-12">
          <button className="px-8 py-4 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300">
            Retour
          </button>
          <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
            Télécharger le PDF
          </button>
        </div>
      </div>
    </div>
  );
};