-- Create database schema for PostgreSQL

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    role_id INTEGER,
    company_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Subscription tiers table
CREATE TABLE subscription_tiers (
    subscription_tier_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- Regions table
CREATE TABLE regions (
    region_id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

-- Business types table
CREATE TABLE business_types (
    business_type_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Companies table
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    business_type_id INTEGER,
    registration_number VARCHAR(100),
    tin_number VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(100),
    website VARCHAR(100),
    address VARCHAR(100),
    region_id INTEGER,
    digital_address VARCHAR(50),
    currency VARCHAR(20) DEFAULT 'GHS',
    timezone VARCHAR(100) DEFAULT 'GMT',
    logo TEXT,
    primary_color VARCHAR(50),
    is_active BOOLEAN DEFAULT FALSE,
    subscription_tier_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Units table
CREATE TABLE units (
    unit_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Categories table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

-- Products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    sku TEXT,
    bar_code TEXT,
    category_id INTEGER,
    
    cost_price DECIMAL(20,2) NOT NULL,
    selling_price DECIMAL(20,2) NOT NULL,
    track_inventory BOOLEAN DEFAULT FALSE,
    current_stock DECIMAL(10,3) DEFAULT 0,
    min_stock_level DECIMAL(10,3) DEFAULT 0,
    max_stock_level DECIMAL(10,3) DEFAULT 0,
    reorder_point DECIMAL(10,3) DEFAULT 0,
    
    base_unit VARCHAR(50),
    purchase_unit VARCHAR(50),
    sales_unit VARCHAR(50),
    
    units_per_purchase DECIMAL(10,3) DEFAULT 1,
    unit_per_sale DECIMAL(10,3),
    
    brand VARCHAR(100),
    model VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(50),
    weight DECIMAL(8,3),
    
    images TEXT,
    thumbnail TEXT,
    
    is_active BOOLEAN DEFAULT TRUE,
    is_service BOOLEAN DEFAULT FALSE,
    is_taxable BOOLEAN DEFAULT TRUE,
    tax_rate DECIMAL(5,4) DEFAULT 0.0000,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id INTEGER
);

-- Suppliers table
CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(200),
    email VARCHAR(200),
    phone VARCHAR(50),
    address VARCHAR(250),
    city VARCHAR(100),
    region_id INTEGER,
    country VARCHAR(250),
    payment_terms VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    company_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    email VARCHAR(200),
    phone VARCHAR(50),
    address VARCHAR(250),
    city VARCHAR(100),
    region_id INTEGER,
    customer_type VARCHAR(30) CHECK(customer_type IN ('INDIVIDUAL', 'BUSINESS')) DEFAULT 'INDIVIDUAL',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_id INTEGER
);

-- Purchase orders table
CREATE TABLE purchase_orders (
    p_order_id SERIAL PRIMARY KEY,
    p_order_num VARCHAR(100) UNIQUE NOT NULL,
    supplier_id INTEGER,
    order_date TIMESTAMP NOT NULL,
    expected_date TIMESTAMP,
    received_date TIMESTAMP,
    status VARCHAR(100) CHECK(status IN ('PENDING', 'ORDERED', 'RECEIVED', 'CANCELLED')),
    sub_total DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) DEFAULT 0,
    notes VARCHAR(250),
    company_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase items table
CREATE TABLE purchase_items (
    p_item_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    p_order_id INTEGER NOT NULL,
    quantity_ordered DECIMAL(10,3) NOT NULL, -- purchase units
    quantity_received DECIMAL(10,3) DEFAULT 0, -- purchase units
    unit_cost DECIMAL(10,2) NOT NULL, -- cost per purchase unit
    total_cost DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales orders table
CREATE TABLE sales_orders (
    s_order_id SERIAL PRIMARY KEY,
    s_order_num VARCHAR(100) UNIQUE NOT NULL,
    customer_id INTEGER,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_date TIMESTAMP,
    status VARCHAR(100) CHECK(status IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    sub_total DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) DEFAULT 0,
    payment_status VARCHAR(100) CHECK(payment_status IN ('PENDING', 'PARTIAL', 'PAID')),
    notes VARCHAR(250),
    company_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sale items table
CREATE TABLE sale_items (
    s_item_id SERIAL PRIMARY KEY,
    s_order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0,
    tax_rate DECIMAL(5,4) DEFAULT 0,
    line_total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory logs table
CREATE TABLE inventory_logs (
    log_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    transaction_type VARCHAR(100) CHECK(transaction_type IN ('PURCHASE', 'SALE', 'ADJUSTMENT', 'TRANSFER', 'RETURN')),
    reference_type VARCHAR(100) CHECK(reference_type IN ('PURCHASE_ORDER', 'SALES_ORDER', 'MANUAL_ADJUSTMENT', 'STOCK_TRANSFER')),
    reference_id VARCHAR(50),
    
    quantity_before DECIMAL(10,3) NOT NULL,
    quantity_change DECIMAL(10,3) NOT NULL,
    quantity_after DECIMAL(10,3) NOT NULL,
    
    unit_cost DECIMAL(10,2),
    notes TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(200),
    company_id INTEGER NOT NULL
);

-- Add foreign key constraints
ALTER TABLE users ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(role_id);
ALTER TABLE users ADD CONSTRAINT fk_users_company FOREIGN KEY (company_id) REFERENCES companies(company_id);

ALTER TABLE companies ADD CONSTRAINT fk_companies_business_type FOREIGN KEY (business_type_id) REFERENCES business_types(business_type_id);
ALTER TABLE companies ADD CONSTRAINT fk_companies_region FOREIGN KEY (region_id) REFERENCES regions(region_id);
ALTER TABLE companies ADD CONSTRAINT fk_companies_subscription_tier FOREIGN KEY (subscription_tier_id) REFERENCES subscription_tiers(subscription_tier_id);

ALTER TABLE products ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(category_id);
ALTER TABLE products ADD CONSTRAINT fk_products_base_unit FOREIGN KEY (base_unit) REFERENCES units(name);
ALTER TABLE products ADD CONSTRAINT fk_products_purchase_unit FOREIGN KEY (purchase_unit) REFERENCES units(name);
ALTER TABLE products ADD CONSTRAINT fk_products_sales_unit FOREIGN KEY (sales_unit) REFERENCES units(name);
ALTER TABLE products ADD CONSTRAINT fk_products_company FOREIGN KEY (company_id) REFERENCES companies(company_id);

ALTER TABLE suppliers ADD CONSTRAINT fk_suppliers_region FOREIGN KEY (region_id) REFERENCES regions(region_id);
ALTER TABLE suppliers ADD CONSTRAINT fk_suppliers_company FOREIGN KEY (company_id) REFERENCES companies(company_id);

ALTER TABLE customers ADD CONSTRAINT fk_customers_region FOREIGN KEY (region_id) REFERENCES regions(region_id);
ALTER TABLE customers ADD CONSTRAINT fk_customers_company FOREIGN KEY (company_id) REFERENCES companies(company_id);

ALTER TABLE purchase_orders ADD CONSTRAINT fk_purchase_orders_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id);
ALTER TABLE purchase_orders ADD CONSTRAINT fk_purchase_orders_company FOREIGN KEY (company_id) REFERENCES companies(company_id);

ALTER TABLE purchase_items ADD CONSTRAINT fk_purchase_items_product FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE purchase_items ADD CONSTRAINT fk_purchase_items_order FOREIGN KEY (p_order_id) REFERENCES purchase_orders(p_order_id);

ALTER TABLE sales_orders ADD CONSTRAINT fk_sales_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id);
ALTER TABLE sales_orders ADD CONSTRAINT fk_sales_orders_company FOREIGN KEY (company_id) REFERENCES companies(company_id);

ALTER TABLE sale_items ADD CONSTRAINT fk_sale_items_order FOREIGN KEY (s_order_id) REFERENCES sales_orders(s_order_id);
ALTER TABLE sale_items ADD CONSTRAINT fk_sale_items_product FOREIGN KEY (product_id) REFERENCES products(product_id);

ALTER TABLE inventory_logs ADD CONSTRAINT fk_inventory_logs_product FOREIGN KEY (product_id) REFERENCES products(product_id);
ALTER TABLE inventory_logs ADD CONSTRAINT fk_inventory_logs_company FOREIGN KEY (company_id) REFERENCES companies(company_id);

-- indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_products_company ON products(company_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_customers_company ON customers(company_id);
CREATE INDEX idx_suppliers_company ON suppliers(company_id);
CREATE INDEX idx_purchase_orders_company ON purchase_orders(company_id);
CREATE INDEX idx_sales_orders_company ON sales_orders(company_id);
CREATE INDEX idx_inventory_logs_product ON inventory_logs(product_id);
CREATE INDEX idx_inventory_logs_company ON inventory_logs(company_id);