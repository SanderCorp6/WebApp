export function FormSection({ title, icon: Icon, children, className }) {
    return (
        <section className={`forms-section ${className || ''}`}>
            <header>
                {Icon && <Icon className='icon'/>}
                <h2>{title}</h2>
            </header>
            <div className="forms-container">
                {children}
            </div>
        </section>
    );
}