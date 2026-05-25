
        // JSON Product Database - Similar to what an e-commerce site would use
        const productsData = [
            { id: 1, name: "Wireless Bluetooth Headphones", category: "Electronics", price: "$79.99" },
            { id: 2, name: "Smart Watch Series 7", category: "Electronics", price: "$399.99" },
            { id: 3, name: "Laptop Stand Aluminum", category: "Electronics", price: "$49.99" },
            { id: 4, name: "Mechanical Keyboard RGB", category: "Electronics", price: "$129.99" },
            { id: 5, name: "USB-C Hub Adapter", category: "Electronics", price: "$34.99" },
            { id: 6, name: "Portable Phone Charger", category: "Electronics", price: "$29.99" },
            { id: 7, name: "Wireless Mouse Ergonomic", category: "Electronics", price: "$45.99" },
            { id: 8, name: "Noise Cancelling Earbuds", category: "Electronics", price: "$159.99" },
            { id: 9, name: "Men's Cotton T-Shirt", category: "Clothing", price: "$19.99" },
            { id: 10, name: "Women's Yoga Pants", category: "Clothing", price: "$39.99" },
            { id: 11, name: "Running Shoes Athletic", category: "Clothing", price: "$89.99" },
            { id: 12, name: "Denim Jeans Classic Fit", category: "Clothing", price: "$59.99" },
            { id: 13, name: "Winter Jacket Waterproof", category: "Clothing", price: "$129.99" },
            { id: 14, name: "Baseball Cap Adjustable", category: "Clothing", price: "$24.99" },
            { id: 15, name: "JavaScript Programming Guide", category: "Books", price: "$34.99" },
            { id: 16, name: "The Art of Web Design", category: "Books", price: "$44.99" },
            { id: 17, name: "Cooking Made Easy Cookbook", category: "Books", price: "$29.99" },
            { id: 18, name: "Mystery Novel Bestseller", category: "Books", price: "$14.99" },
            { id: 19, name: "Photography Basics Manual", category: "Books", price: "$39.99" },
            { id: 20, name: "Fitness Training Handbook", category: "Books", price: "$24.99" },
            { id: 21, name: "Gaming Monitor 27 inch", category: "Electronics", price: "$299.99" },
            { id: 22, name: "Webcam HD 1080p", category: "Electronics", price: "$69.99" },
            { id: 23, name: "Office Chair Ergonomic", category: "Furniture", price: "$199.99" },
            { id: 24, name: "Standing Desk Adjustable", category: "Furniture", price: "$349.99" },
            { id: 25, name: "Desk Lamp LED", category: "Furniture", price: "$39.99" },
            { id: 26, name: "Backpack Travel Laptop", category: "Accessories", price: "$54.99" },
            { id: 27, name: "Water Bottle Stainless Steel", category: "Accessories", price: "$24.99" },
            { id: 28, name: "Sunglasses Polarized", category: "Accessories", price: "$79.99" },
            { id: 29, name: "Smart Home Speaker", category: "Electronics", price: "$99.99" },
            { id: 30, name: "Fitness Tracker Watch", category: "Electronics", price: "$149.99" }
        ];

        $(document).ready(function () {
            let selectedIndex = -1;

            // Search input event handler
            $('#searchInput').on('input', function () {
                const searchTerm = $(this).val().trim();
                selectedIndex = -1;

                // Show/hide clear button
                if (searchTerm.length > 0) {
                    $('#clearBtn').addClass('visible');
                } else {
                    $('#clearBtn').removeClass('visible');
                }

                // Perform search
                if (searchTerm.length > 0) {
                    const results = searchProducts(searchTerm);
                    displaySuggestions(results, searchTerm);
                    $('.search-container').addClass('active');
                } else {
                    hideSuggestions();
                }
            });

            // Clear button handler
            $('#clearBtn').on('click', function () {
                $('#searchInput').val('').focus();
                $(this).removeClass('visible');
                hideSuggestions();
            });

            // Focus/blur handlers for search container
            $('#searchInput').on('focus', function () {
                if ($(this).val().trim().length > 0) {
                    $('.search-container').addClass('active');
                    $('#suggestionsContainer').addClass('active');
                }
            });

            // Click outside to close
            $(document).on('click', function (e) {
                if (!$(e.target).closest('.search-container').length) {
                    $('.search-container').removeClass('active');
                    $('#suggestionsContainer').removeClass('active');
                }
            });

            // Keyboard navigation
            $('#searchInput').on('keydown', function (e) {
                const $suggestions = $('.suggestion-item');
                const suggestionsCount = $suggestions.length;

                if (suggestionsCount === 0) return;

                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        selectedIndex = (selectedIndex + 1) % suggestionsCount;
                        updateSelection($suggestions);
                        break;

                    case 'ArrowUp':
                        e.preventDefault();
                        selectedIndex = selectedIndex <= 0 ? suggestionsCount - 1 : selectedIndex - 1;
                        updateSelection($suggestions);
                        break;

                    case 'Enter':
                        e.preventDefault();
                        if (selectedIndex >= 0) {
                            $suggestions.eq(selectedIndex).click();
                        }
                        break;

                    case 'Escape':
                        hideSuggestions();
                        $('#searchInput').blur();
                        break;
                }
            });

            // Search function - filters products based on search term
            function searchProducts(term) {
                const lowerTerm = term.toLowerCase();
                return productsData.filter(product =>
                    product.name.toLowerCase().includes(lowerTerm) ||
                    product.category.toLowerCase().includes(lowerTerm)
                );
            }

            // Display suggestions with highlighting
            function displaySuggestions(results, searchTerm) {
                const $container = $('#suggestionsContainer');
                $container.empty();

                if (results.length === 0) {
                    $container.html(`
                        <div class="no-results">
                            <div class="no-results-icon">🔍</div>
                            <p>No products found for "<strong>${searchTerm}</strong>"</p>
                            <p style="font-size: 0.9rem; margin-top: 8px;">Try searching for electronics, clothing, books, or furniture</p>
                        </div>
                    `);
                    $container.addClass('active');
                    return;
                }

                // Limit to first 8 results
                results.slice(0, 8).forEach(product => {
                    const highlightedName = highlightText(product.name, searchTerm);
                    const highlightedCategory = highlightText(product.category, searchTerm);

                    const $item = $(`
                        <div class="suggestion-item" data-id="${product.id}">
                            <div class="suggestion-content">
                                <div class="suggestion-title">${highlightedName}</div>
                                <div class="suggestion-category">${highlightedCategory}</div>
                            </div>
                            <div class="suggestion-price">${product.price}</div>
                        </div>
                    `);

                    // Click handler for suggestion
                    $item.on('click', function () {
                        selectProduct(product);
                    });

                    // Hover handler
                    $item.on('mouseenter', function () {
                        $('.suggestion-item').removeClass('selected');
                        $(this).addClass('selected');
                        selectedIndex = $(this).index();
                    });

                    $container.append($item);
                });

                $container.addClass('active');
            }

            // Highlight matching text
            function highlightText(text, term) {
                const regex = new RegExp(`(${term})`, 'gi');
                return text.replace(regex, '<span class="highlight">$1</span>');
            }

            // Update keyboard selection
            function updateSelection($suggestions) {
                $suggestions.removeClass('selected');
                if (selectedIndex >= 0 && selectedIndex < $suggestions.length) {
                    const $selected = $suggestions.eq(selectedIndex);
                    $selected.addClass('selected');

                    // Scroll into view if needed
                    const container = $('#suggestionsContainer')[0];
                    const element = $selected[0];
                    const containerRect = container.getBoundingClientRect();
                    const elementRect = element.getBoundingClientRect();

                    if (elementRect.bottom > containerRect.bottom) {
                        element.scrollIntoView(false);
                    } else if (elementRect.top < containerRect.top) {
                        element.scrollIntoView(true);
                    }
                }
            }

            // Product selection handler
            function selectProduct(product) {
                $('#searchInput').val(product.name);
                hideSuggestions();

                // Alert simulation - in real app, this would navigate or show product details
                alert(`Selected: ${product.name}\nCategory: ${product.category}\nPrice: ${product.price}`);
            }

            // Hide suggestions
            function hideSuggestions() {
                $('#suggestionsContainer').removeClass('active');
                $('.search-container').removeClass('active');
                selectedIndex = -1;
            }
        });
  