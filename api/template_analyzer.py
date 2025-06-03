#!/usr/bin/env python3
import os
import re
import logging
from bs4 import BeautifulSoup

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("template_analysis.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class TemplateAnalyzer:
    def __init__(self):
        self.template_issues = []
        self.fixes_applied = []
    
    def analyze_templates(self):
        """Analiza las plantillas Jinja2 para encontrar problemas"""
        logger.info("\n=== Analizando plantillas Jinja2 ===")
        templates_dir = "/home/cel_web/api/templates"
        admin_templates = os.path.join(templates_dir, "admin")
        dashboard_templates = os.path.join(templates_dir, "dashboard")
        
        # Analizar plantillas de administración
        self._analyze_template_directory(admin_templates)
        
        # Analizar plantillas de dashboard
        self._analyze_template_directory(dashboard_templates)
        
        # Mostrar problemas encontrados
        if self.template_issues:
            logger.info(f"Se encontraron {len(self.template_issues)} problemas en las plantillas")
            for issue in self.template_issues:
                logger.info(f"- {issue}")
        else:
            logger.info("No se encontraron problemas en las plantillas")
        
        # Mostrar correcciones aplicadas
        if self.fixes_applied:
            logger.info(f"\nSe aplicaron {len(self.fixes_applied)} correcciones")
            for fix in self.fixes_applied:
                logger.info(f"- {fix}")
    
    def _analyze_template_directory(self, directory):
        """Analiza todas las plantillas en un directorio"""
        for filename in os.listdir(directory):
            if filename.endswith(".html"):
                file_path = os.path.join(directory, filename)
                self._analyze_template_file(file_path)
    
    def _analyze_template_file(self, file_path):
        """Analiza una plantilla Jinja2 para encontrar problemas"""
        logger.info(f"Analizando plantilla: {file_path}")
        try:
            with open(file_path, 'r') as file:
                content = file.read()
                
                # Buscar problemas comunes
                self._check_api_urls(file_path, content)
                self._check_fetch_with_auth(file_path, content)
                self._check_css_errors(file_path, content)
                
        except Exception as e:
            logger.error(f"Error al analizar plantilla {file_path}: {e}")
    
    def _check_api_urls(self, file_path, content):
        """Verifica las URLs de la API en la plantilla"""
        # Buscar URLs que no usen el prefijo /api/ correcto
        api_calls = re.findall(r'fetch\([\'"](.+?)[\'"]', content)
        for url in api_calls:
            if not url.startswith('http') and not url.startswith('/api/') and not url.startswith('{{') and 'api' not in url:
                issue = f"URL sin prefijo /api/ en {file_path}: {url}"
                logger.warning(issue)
                self.template_issues.append(issue)
                self._fix_template_api_url(file_path, url)
    
    def _check_fetch_with_auth(self, file_path, content):
        """Verifica el uso correcto de fetchWithAuth"""
        # Buscar llamadas fetch que deberían usar fetchWithAuth
        fetch_calls = re.findall(r'fetch\([\'"](.+?)[\'"]', content)
        for url in fetch_calls:
            if '/api/' in url and 'fetchWithAuth' not in content:
                issue = f"Uso de fetch en lugar de fetchWithAuth para API en {file_path}"
                logger.warning(issue)
                self.template_issues.append(issue)
                self._fix_template_fetch_with_auth(file_path)
    
    def _check_css_errors(self, file_path, content):
        """Verifica errores comunes de CSS en las plantillas"""
        # Buscar estilos inline sin punto y coma al final
        style_attrs = re.findall(r'style=[\'"](.+?)[\'"]', content)
        for style in style_attrs:
            if style and not style.endswith(';') and ';' in style:
                issue = f"Estilo CSS sin punto y coma final en {file_path}: {style}"
                logger.warning(issue)
                self.template_issues.append(issue)
                self._fix_template_css(file_path, style)
    
    def _fix_template_api_url(self, file_path, url):
        """Corrige URLs de API en plantillas"""
        try:
            with open(file_path, 'r') as file:
                content = file.read()
            
            # Reemplazar URL sin prefijo /api/ por URL con prefijo
            fixed_content = content.replace(f'"{url}"', f'"/api/{url.lstrip("/")}"')
            fixed_content = fixed_content.replace(f"'{url}'", f"'/api/{url.lstrip('/')}'")
            
            with open(file_path, 'w') as file:
                file.write(fixed_content)
                
            fix_msg = f"Corregida URL en {file_path}: {url} -> /api/{url.lstrip('/')}"
            logger.info(fix_msg)
            self.fixes_applied.append(fix_msg)
        except Exception as e:
            logger.error(f"Error al corregir URL en {file_path}: {e}")
    
    def _fix_template_fetch_with_auth(self, file_path):
        """Reemplaza fetch por fetchWithAuth en plantillas"""
        try:
            with open(file_path, 'r') as file:
                content = file.read()
            
            # Reemplazar fetch por fetchWithAuth para llamadas a la API
            fixed_content = re.sub(r'fetch\([\'"](/api/.+?)[\'"]', r'fetchWithAuth(\1', content)
            
            with open(file_path, 'w') as file:
                file.write(fixed_content)
                
            fix_msg = f"Reemplazado fetch por fetchWithAuth en {file_path}"
            logger.info(fix_msg)
            self.fixes_applied.append(fix_msg)
        except Exception as e:
            logger.error(f"Error al reemplazar fetch en {file_path}: {e}")
    
    def _fix_template_css(self, file_path, style):
        """Corrige errores de CSS en plantillas"""
        try:
            with open(file_path, 'r') as file:
                content = file.read()
            
            # Añadir punto y coma al final del estilo
            fixed_style = style if style.endswith(';') else f"{style};"
            fixed_content = content.replace(f'style="{style}"', f'style="{fixed_style}"')
            fixed_content = fixed_content.replace(f"style='{style}'", f"style='{fixed_style}'")
            
            with open(file_path, 'w') as file:
                file.write(fixed_content)
                
            fix_msg = f"Corregido estilo CSS en {file_path}: {style} -> {fixed_style}"
            logger.info(fix_msg)
            self.fixes_applied.append(fix_msg)
        except Exception as e:
            logger.error(f"Error al corregir CSS en {file_path}: {e}")

if __name__ == "__main__":
    analyzer = TemplateAnalyzer()
    analyzer.analyze_templates()
    print("Análisis de plantillas completado. Revisa el archivo template_analysis.log para más detalles.")
