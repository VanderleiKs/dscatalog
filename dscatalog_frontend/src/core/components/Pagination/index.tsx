import { ReactComponent as ArrowImage } from 'core/assets/images/seta.svg';
import { GenerateList } from 'core/utils/List';
import React from 'react';
import './styles.scss';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (page: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {
    const pages = GenerateList(totalPages);
    const pagePreviuos = totalPages > 0 && activePage > 0 ? 'active-link' : 'inactive-link';
    const pageNext = (activePage + 1) < totalPages ? 'active-link' : 'inactive-link';

    return (
        <div className="pagination-container">
            <ArrowImage className={`arrow-previuos ${pagePreviuos}`} onClick={() => onChange(activePage - 1)}/>
            {pages.map(page => {
                return (
                    <div
                        key={page}
                        className={`pagination-card ${page === activePage ? 'active' : ''}`}
                        onClick={() => onChange(page)}
                    >
                        {page + 1}
                    </div>
                )
            })}
            <ArrowImage className={`arrow-next ${pageNext}`} onClick={() => onChange(activePage + 1)} />
        </div>
    );
}

export default Pagination;