import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

interface CustomMultiselectProps {
    options: string[];
    onSelect: (selectedList: any, selectedItem: any) => void;
    onRemove: (selectedList: any, removedItem: any) => void;
    placeholder: string;
}

const CustomMultiselect: React.FC<CustomMultiselectProps> = ({
    options,
    onSelect,
    onRemove,
    placeholder
}) => {
    return (
        <div className='w-full'>
            <Multiselect
                options={options}
                onSelect={onSelect}
                onRemove={onRemove}
                isObject={false}
                placeholder={placeholder}
                style={{
                    optionContainer: {
                        backgroundColor: '#00ff95',
                        borderColor: '#d1d5db',
                        borderWidth: '1px',
                        borderRadius: '0.5rem',
                        marginTop: '0.5rem',
                        zIndex: 400,
                    },
                    option: {
                        color: '#01140d',
                        padding: '0.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: '#00ff95',
                    },
                    
                    chips: {
                        backgroundColor: '#00ff95',
                        color: '#01140d',
                        fontWeight: '500',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.5rem',
                        margin: '0.25rem',
                    },
                    searchBox: {
                        border: '1px solid #00ff95',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                        '&:focus': {
                            outline: 'none',
                            borderColor: '#00ff95',
                        },
                        fontSize: "0.875rem"
                    }
                }}
            />
        </div>
    );
};

export default CustomMultiselect;
