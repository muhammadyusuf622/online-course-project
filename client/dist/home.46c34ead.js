// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor)=>{
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Add scroll effect to header
window.addEventListener('scroll', ()=>{
    const header = document.querySelector('header');
    if (window.scrollY > 50) header.style.backgroundColor = '#003d99';
    else header.style.backgroundColor = '#0052cc';
});

//# sourceMappingURL=home.46c34ead.js.map
