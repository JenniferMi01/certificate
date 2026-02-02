const formatDateToFrench = (dateString) => {
    const date = new Date(dateString);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

export { formatDateToFrench };