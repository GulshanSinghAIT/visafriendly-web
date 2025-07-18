import React, { useState, useRef, useEffect } from 'react';
import styles from './EducationForm.module.css';

export function SearchableDropdown({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  required = false,
  id,
  data = [],
  otherOption = true,
  onOtherToggle = null
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10); // Limit to 10 results for better UX

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle item selection
  const handleItemSelect = (item) => {
    if (item === 'Other') {
      setSearchTerm('');
      onChange('Other');
      setIsOpen(false);
      // Notify parent component to show other input field
      if (onOtherToggle) {
        onOtherToggle(true);
      }
    } else {
      setSearchTerm(item);
      onChange(item);
      setIsOpen(false);
      // Notify parent component to hide other input field
      if (onOtherToggle) {
        onOtherToggle(false);
      }
    }
  };

  // Handle input change for search
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    
    if (newValue === '') {
      onChange('');
    } else {
      onChange(newValue);
    }
    
    setIsOpen(true);
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // Get display value
  const getDisplayValue = () => {
    return searchTerm || value || '';
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <input
        type="text"
        id={id}
        className={styles.selectInput}
        value={getDisplayValue()}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
      />
      
      {isOpen && (
        <div className={styles.dropdownList}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleItemSelect(item)}
              >
                {item}
              </div>
            ))
          ) : (
            <div className={styles.dropdownItem}>No items found</div>
          )}
          
          {/* Show "Other" option if enabled */}
          {otherOption && (
            <div
              className={styles.dropdownItem}
              onClick={() => handleItemSelect('Other')}
              style={{ borderTop: '1px solid #eee', fontWeight: 'bold' }}
            >
              Other
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
