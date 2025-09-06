const API_BASE = 'http://localhost:3001/api';

let currentSection = 'departements';
let editingId = null;

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        switchSection(section);
    });
});

function switchSection(section) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    document.getElementById(section).classList.add('active');
    
    currentSection = section;
    loadData(section);
}

// API Calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    
    if (data) options.body = JSON.stringify(data);
    
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    return response.json();
}

// Load Data
async function loadData(section) {
    try {
        const data = await apiCall(`/${section}`);
        renderTable(section, data);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Render Tables
function renderTable(section, data) {
    const tbody = document.querySelector(`#${section}Table tbody`);
    tbody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        if (section === 'departements') {
            row.innerHTML = `
                <td>${item.nom}</td>
                <td>${new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="btn-edit" onclick="editItem('${section}', '${item._id}')">Modifier</button>
                    <button class="btn-delete" onclick="deleteItem('${section}', '${item._id}')">Supprimer</button>
                </td>
            `;
        } else if (section === 'communes') {
            row.innerHTML = `
                <td>${item.nom}</td>
                <td>${item.departementId?.nom || 'N/A'}</td>
                <td>${item.code || 'N/A'}</td>
                <td>
                    <button class="btn-edit" onclick="editItem('${section}', '${item._id}')">Modifier</button>
                    <button class="btn-delete" onclick="deleteItem('${section}', '${item._id}')">Supprimer</button>
                </td>
            `;
        } else if (section === 'villes') {
            row.innerHTML = `
                <td>${item.nom}</td>
                <td>${item.communeId?.nom || 'N/A'}</td>
                <td>${item.communeId?.departementId?.nom || 'N/A'}</td>
                <td>
                    <button class="btn-edit" onclick="editItem('${section}', '${item._id}')">Modifier</button>
                    <button class="btn-delete" onclick="deleteItem('${section}', '${item._id}')">Supprimer</button>
                </td>
            `;
        }
        
        tbody.appendChild(row);
    });
}

// Modal Functions
async function openModal(type, id = null) {
    editingId = id;
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const formFields = document.getElementById('formFields');
    
    title.textContent = id ? `Modifier ${type}` : `Ajouter ${type}`;
    
    let fields = '';
    
    if (type === 'departement') {
        fields = `
            <div class="form-group">
                <label>Nom du département</label>
                <input type="text" name="nom" required>
            </div>
        `;
    } else if (type === 'commune') {
        const departements = await apiCall('/departements');
        const options = departements.map(d => `<option value="${d._id}">${d.nom}</option>`).join('');
        fields = `
            <div class="form-group">
                <label>Nom de la commune</label>
                <input type="text" name="nom" required>
            </div>
            <div class="form-group">
                <label>Département</label>
                <select name="departementId" required>
                    <option value="">Sélectionner un département</option>
                    ${options}
                </select>
            </div>
            <div class="form-group">
                <label>Code (optionnel)</label>
                <input type="text" name="code">
            </div>
        `;
    } else if (type === 'ville') {
        const communes = await apiCall('/communes');
        const options = communes.map(c => `<option value="${c._id}">${c.nom} (${c.departementId?.nom})</option>`).join('');
        fields = `
            <div class="form-group">
                <label>Nom de la ville/arrondissement</label>
                <input type="text" name="nom" required>
            </div>
            <div class="form-group">
                <label>Commune</label>
                <select name="communeId" required>
                    <option value="">Sélectionner une commune</option>
                    ${options}
                </select>
            </div>
        `;
    }
    
    formFields.innerHTML = fields;
    
    if (id) {
        const item = await apiCall(`/${currentSection}/${id}`);
        Object.keys(item).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) input.value = item[key];
        });
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    editingId = null;
}

// Form Submit
document.getElementById('modalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        if (editingId) {
            await apiCall(`/${currentSection}/${editingId}`, 'PUT', data);
        } else {
            await apiCall(`/${currentSection}`, 'POST', data);
        }
        
        closeModal();
        loadData(currentSection);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'enregistrement');
    }
});

// Edit Item
async function editItem(section, id) {
    const type = section.slice(0, -1);
    await openModal(type, id);
}

// Delete Item
async function deleteItem(section, id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
        try {
            await apiCall(`/${section}/${id}`, 'DELETE');
            loadData(section);
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData('departements');
});