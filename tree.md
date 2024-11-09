# wordpress-pachet

1. Sorting and installing css and js:
wordpress-pachet/
├── composer.json # Composer configuration for the project
├── composer.lock # File automatically generated by Composer
├── copy-assets.php # PHP script for copying CSS/JS files
├── post-install-cmd.php # (Optional) Other post-install commands
├── assets/ # Folder for CSS/JS (automatically generated)
├── vendor/ # Dependencies installed automatically by Composer
└── wordpress/ # WordPress core, manually included
    ├── wp-admin/
    ├── wp-content/
    │   ├── plugins/
    │   ├── themes/
    ├── wp-includes/
    ├── wp-config.php
    └── alte fișiere WP...


# to 

2. After installing and extracting js and css main core wordpress will be removed for security:
wordpress-scripts/
├── composer.json        # Composer configuration without wordpress core
├── assets/              # Required CSS/JS files
│   ├── custom.js
│   ├── style.css
└── README.md            # Documentation (opțional)