import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

export default function PolicyPageShell({
  title,
  documentTitle,
  lead,
  children
}) {
  useEffect(() => {
    document.title = documentTitle || `${title} | Gokulesh Pharmacy`;
  }, [title, documentTitle]);

  return (
    <article className="policy-page page">
      <div className="container policy-page-inner">
        <nav className="policy-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/policies">Policies</Link>
          <span aria-hidden="true">/</span>
          <span>{title}</span>
        </nav>

        <header className="policy-page-header">
          <h1>{title}</h1>
          {lead ? <p className="policy-page-lead">{lead}</p> : null}
        </header>

        <div className="policy-page-card">{children}</div>

        <div className="policy-page-actions">
          <Link to="/policies" className="btn btn-outline">
            All policies
          </Link>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </article>
  );
}
