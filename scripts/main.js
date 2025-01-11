const attributes = {
    bulkApperception: 14,
    candor: 12,
    vivacity: 13,
    coordination: 15,
    meekness: 10,
    humility: 11,
    cruelty: 8,
    selfPreservation: 14,
    patience: 10,
    decisiveness: 12,
    imagination: 13,
    curiosity: 15,
    aggression: 9,
    loyalty: 14,
    empathy: 12,
    tenacity: 13,
    courage: 14,
    sensuality: 10,
    charm: 13,
    humor: 11
};

const attributeClusters = {
    cognitive: {
        label: 'Cognitive Profile',
        attributes: ['bulkApperception', 'imagination', 'curiosity', 'decisiveness']
    },
    social: {
        label: 'Social Profile',
        attributes: ['charm', 'empathy', 'candor', 'humor', 'sensuality']
    },
    survival: {
        label: 'Survival Profile',
        attributes: ['selfPreservation', 'aggression', 'courage', 'tenacity']
    },
    temperament: {
        label: 'Temperament Profile',
        attributes: ['meekness', 'humility', 'patience', 'cruelty']
    }
};

// Create attribute sliders grouped by category
Object.entries(attributeClusters).forEach(([category, cluster]) => {
    const categoryContainer = document.getElementById(`${category}Attributes`);
    cluster.attributes.forEach(attr => {
        const formattedName = attr.replace(/([A-Z])/g, ' $1').trim();
        const sliderHtml = `
            <div class="attribute-slider">
                <div class="attribute-header">
                    <label>${formattedName}</label>
                    <span id="${attr}Value">${attributes[attr]}/20</span>
                </div>
                <div class="slider-container">
                    <input type="range" min="0" max="20" value="${attributes[attr]}" 
                           id="${attr}" onchange="updateAttribute('${attr}')">
                </div>
            </div>
        `;
        categoryContainer.innerHTML += sliderHtml;
    });
});

// Create charts
const chartConfigs = {
    cognitive: {
        id: 'cognitiveChart',
        color: 'rgba(54, 162, 235, 0.2)'
    },
    social: {
        id: 'socialChart',
        color: 'rgba(255, 99, 132, 0.2)'
    },
    survival: {
        id: 'survivalChart',
        color: 'rgba(75, 192, 192, 0.2)'
    },
    temperament: {
        id: 'temperamentChart',
        color: 'rgba(255, 206, 86, 0.2)'
    }
};

const charts = {};

Object.entries(attributeClusters).forEach(([key, cluster]) => {
    const ctx = document.getElementById(chartConfigs[key].id).getContext('2d');
    charts[key] = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: cluster.attributes.map(attr => attr.replace(/([A-Z])/g, ' $1').trim()),
            datasets: [{
                label: cluster.label,
                data: cluster.attributes.map(attr => attributes[attr]),
                backgroundColor: chartConfigs[key].color,
                borderColor: chartConfigs[key].color.replace('0.2', '1'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    pointLabels: {
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
});

function updateAttribute(key) {
    const value = document.getElementById(key).value;
    attributes[key] = parseInt(value);
    document.getElementById(`${key}Value`).textContent = `${value}/20`;
    updateCharts();
    updateAnalysis();
}

function updateCharts() {
    Object.entries(attributeClusters).forEach(([key, cluster]) => {
        charts[key].data.datasets[0].data = cluster.attributes.map(attr => attributes[attr]);
        charts[key].update();
    });
}

function updateAnalysis() {
    // Cognitive Analysis
    const cognitiveAnalysis = [];
    if (attributes.bulkApperception > 15) {
        cognitiveAnalysis.push('Exceptional processing and learning capabilities');
    }
    if (attributes.imagination > 14 && attributes.curiosity > 14) {
        cognitiveAnalysis.push('Highly creative and inquisitive mindset');
    }
    if (attributes.decisiveness > 15) {
        cognitiveAnalysis.push('Strong decision-making capabilities');
    }
    if (attributes.bulkApperception < 10) {
        cognitiveAnalysis.push('Limited cognitive processing ability');
    }
    document.getElementById('cognitiveAnalysis').innerHTML = 
        cognitiveAnalysis.length ? cognitiveAnalysis.map(text => `<p>${text}</p>`).join('') : '<p>Standard cognitive capabilities</p>';

    // Social Analysis
    const socialAnalysis = [];
    if (attributes.empathy > 15 && attributes.charm > 15) {
        socialAnalysis.push('Exceptional social intelligence and charm');
    }
    if (attributes.humor > 14) {
        socialAnalysis.push('Strong ability to engage through humor');
    }
    if (attributes.candor > 15) {
        socialAnalysis.push('Highly truthful and direct in interactions');
    }
    if (attributes.sensuality > 15) {
        socialAnalysis.push('Strong romantic and sensual tendencies');
    }
    document.getElementById('socialAnalysis').innerHTML = 
        socialAnalysis.length ? socialAnalysis.map(text => `<p>${text}</p>`).join('') : '<p>Balanced social attributes</p>';

    // Survival Analysis
    const survivalAnalysis = [];
    if (attributes.selfPreservation > 15) {
        survivalAnalysis.push('Strong survival instincts');
    }
    if (attributes.courage > 15 && attributes.tenacity > 15) {
        survivalAnalysis.push('Exceptional bravery and persistence');
    }
    if (attributes.aggression > 14) {
        survivalAnalysis.push('High potential for aggressive behavior');
    }
    if (attributes.selfPreservation < 10 && attributes.courage > 15) {
        survivalAnalysis.push('May take unnecessary risks');
    }
    document.getElementById('survivalAnalysis').innerHTML = 
        survivalAnalysis.length ? survivalAnalysis.map(text => `<p>${text}</p>`).join('') : '<p>Standard survival responses</p>';

    // Temperament Analysis
    const temperamentAnalysis = [];
    if (attributes.patience > 15 && attributes.humility > 15) {
        temperamentAnalysis.push('Exceptionally patient and humble disposition');
    }
    if (attributes.cruelty > 12) {
        temperamentAnalysis.push('Tendency towards cruel behavior');
    }
    if (attributes.meekness > 15) {
        temperamentAnalysis.push('Highly submissive personality');
    }
    if (attributes.patience < 10 && attributes.humility < 10) {
        temperamentAnalysis.push('May be impulsive and prideful');
    }
    document.getElementById('temperamentAnalysis').innerHTML = 
        temperamentAnalysis.length ? temperamentAnalysis.map(text => `<p>${text}</p>`).join('') : '<p>Balanced temperament</p>';

    // Overall Analysis
    const overallAnalysis = [];
    if (attributes.bulkApperception > 15 && attributes.curiosity > 14) {
        overallAnalysis.push('High intelligence and processing capability');
    }
    if (attributes.aggression > 12 && attributes.cruelty > 10) {
        overallAnalysis.push('Potentially volatile and dangerous');
    }
    if (attributes.empathy > 12 && attributes.charm > 12) {
        overallAnalysis.push('Strong interpersonal relationship potential');
    }
    if (attributes.imagination > 14 && attributes.curiosity > 12) {
        overallAnalysis.push('Highly creative and inquisitive nature');
    }
    
    document.getElementById('analysisContent').innerHTML = 
        overallAnalysis.length ? overallAnalysis.map(text => `<p>${text}</p>`).join('') : '<p>Balanced overall personality</p>';
}

// Initial analysis update
updateAnalysis();