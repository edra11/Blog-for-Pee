/* ============================================================
   EcoVoice PH — script.js (Enhanced)
   Additions: Search bar, article sources, inline images,
   interactive assessments per topic
   ============================================================ */

/* ── PROGRESS BAR ─────────────────────────────────────────── */
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
  const scrollTop   = document.documentElement.scrollTop;
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = totalHeight > 0 ? (scrollTop / totalHeight * 100) + '%' : '0%';
}

/* ── NAV SCROLL & ACTIVE LINKS ────────────────────────────── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], article[id]');
let lastScrollY = window.scrollY;

function updateNav() {
  const scrollY = window.scrollY;
  const scrollingUp = scrollY < lastScrollY;
  lastScrollY = scrollY;
  if (scrollY <= 60 || scrollingUp) {
    navbar.classList.remove('scrolled');
    navbar.classList.remove('solid');
  } else {
    navbar.classList.remove('scrolled');
    navbar.classList.add('solid');
  }
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ── SMOOTH SCROLL ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    document.getElementById('mobile-menu').classList.remove('open');
  });
});

/* ── HAMBURGER ────────────────────────────────────────────── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!navbar.contains(e.target))
    document.getElementById('mobile-menu').classList.remove('open');
});

/* ── SCROLL REVEAL ────────────────────────────────────────── */
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i % 4 * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealItems.forEach(el => revealObserver.observe(el));

/* ── HERO REVEAL ON LOAD ──────────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal-hero').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 200);
  });
});

/* ── COUNT-UP ANIMATION ───────────────────────────────────── */
const statEls = document.querySelectorAll('.stat-n:not(.no-count)');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const dur     = 1200;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      const val  = Math.floor((1 - Math.pow(1 - prog, 3)) * target);
      el.textContent = val + suffix;
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
statEls.forEach(el => countObserver.observe(el));

/* ── MASTER SCROLL HANDLER ────────────────────────────────── */
window.addEventListener('scroll', () => {
  updateProgress();
  updateNav();
}, { passive: true });
updateProgress();
updateNav();

/* ============================================================
   ARTICLE DATA (Featured Posts — Full Length)
   ============================================================ */
const POSTS = {
  'post-1': {
    badge:    'GLOBAL WARMING',
    img:      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=85',
    title:    'The Causes of Global Warming',
    subtitle: 'Understanding the Human and Natural Forces Heating Our Planet',
    author:   'IT Student Team',
    date:     'March 2026',
    read:     '12 min read',
    tags:     ['#Fossil Fuels', '#Greenhouse Gases', '#Carbon Emissions'],
    body: `
      <p>Global warming refers to the long-term rise in Earth's average surface temperature caused by the accumulation of greenhouse gases in the atmosphere. While natural factors such as volcanic eruptions and solar variation have historically influenced Earth's climate, scientists have reached overwhelming consensus that the current warming trend is driven primarily by human activities. Since the Industrial Revolution, atmospheric CO₂ concentrations have risen from around 280 ppm to over 420 ppm — a level not seen in at least 800,000 years.</p>

<h3>● Burning of Fossil Fuels</h3>
      <p>The single largest cause of global warming is the combustion of fossil fuels — coal, oil, and natural gas — for energy. When burned, these fuels release carbon dioxide (CO₂) and other greenhouse gases that have been locked underground for millions of years. Power plants, vehicles, aircraft, and industrial facilities collectively release over 36 billion metric tons of CO₂ annually.</p>

      <h3>● Main Human Causes</h3>

      <div class="post-example">
        <strong>Burning Fossil Fuels:</strong> Coal, oil, and natural gas release massive amounts of CO₂ when burned for electricity, transportation, and industry — the single largest contributor to global warming.
      </div>
      <div class="post-example">
        <strong>Deforestation:</strong> Clearing forests for agriculture and development removes vital carbon sinks. Deforestation accounts for approximately 10–15% of global CO₂ emissions annually.
      </div>
      <div class="post-example">
        <strong>Agriculture:</strong> Livestock produce methane during digestion. Rice paddies and nitrogen fertilizers release methane and nitrous oxide — greenhouse gases far more potent than CO₂.
      </div>
      <div class="post-example">
        <strong>Industrial Processes:</strong> Cement, steel, and chemical manufacturing emit CO₂ as direct byproducts of production. Cement alone accounts for ~8% of global CO₂ emissions.
      </div>

      <div class="post-example">
        <span class="example-tag">🇵🇭 Philippine Context</span>
        <p>Metro Manila's millions of jeepneys, tricycles, and private vehicles contribute significantly to urban air pollution and CO₂ emissions. The Philippines, while a minor global emitter (~1% of global emissions), is among the most climate-vulnerable nations in the world due to its geographic position and economic vulnerability.</p>
      </div>

      <div class="post-summary">
        <strong>Quick Summary:</strong> Human activities — primarily fossil fuel combustion, deforestation, and industrial processes — release massive quantities of greenhouse gases. These gases trap heat in Earth's atmosphere, causing rapid global temperature increase. This warming is already triggering cascading environmental and humanitarian consequences worldwide.
      </div>`
  },
  'post-2': {
    badge:    'CLIMATE IMPACT',
    img:      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=85',
    title:    'Climate Change and Its Impact',
    subtitle: 'How a Warming Planet is Reshaping Life on Earth',
    author:   'IT Student Team',
    date:     'March 2026',
    read:     '13 min read',
    tags:     ['#Sea Level Rise', '#Extreme Weather', '#Food Security'],
    body: `
      <p>Rising seas, intensifying storms, prolonged droughts, and shifting seasons — climate change is no longer a future threat. Its impacts are being felt right now, across every region of the globe. The Intergovernmental Panel on Climate Change (IPCC) warns that if global warming exceeds 1.5°C above pre-industrial levels, consequences for ecosystems and human societies will be severe and widespread. We are currently at approximately 1.1°C of warming — and rising faster than at any point in human history.</p>

<h3>● Rising Sea Levels: A Threat to Island Nations</h3>
      <p>Rising sea levels result from two primary causes: thermal expansion of seawater as oceans warm, and melting of glaciers and ice sheets. Since 1901, global sea levels have risen approximately 20 centimeters, with the rate of rise accelerating. Currently, sea levels are rising at approximately 3.4 millimeters per year. The Philippines, with 36,289 kilometers of coastline, is extremely vulnerable — an estimated 40 million Filipinos live in coastal areas at risk.</p>

      <h3>● Intensifying Typhoons and Extreme Weather</h3>
      <p>Warmer ocean temperatures provide more energy to tropical storms, making them more intense. The Philippines sits directly in the Western Pacific typhoon belt, experiencing an average of 20 typhoons annually. Typhoon Haiyan (Yolanda) in 2013 struck with winds exceeding 315 km/h, killed over 6,000 people, and displaced 4 million — one of the deadliest natural disasters in Philippine history.</p>

<h3>● Food Security and Agricultural Disruption</h3>
      <p>Climate change affects agriculture through multiple pathways: shifting rainfall patterns, prolonged droughts, extreme heat events, new pest pressures, and saltwater intrusion. The Philippines is heavily dependent on agriculture, with rice as a staple crop. Changing monsoon patterns and increasing droughts in key agricultural regions threaten rice production, risking food security for 115 million people.</p>

      <div class="post-example">
        <span class="example-tag">🇵🇭 Philippine Context</span>
        <p>The Philippines loses an estimated $6–9 billion annually to climate-related disasters — equivalent to 3–5% of national GDP. This includes damage from typhoons, flooding, droughts, and other extreme weather events. As climate impacts intensify, this figure will only increase without aggressive mitigation and adaptation measures.</p>
      </div>

      <div class="post-summary">
        <strong>Quick Summary:</strong> Rising temperatures are causing sea level rise, intensifying typhoons, disrupting agriculture, destabilizing ecosystems, threatening human health, triggering migration, and imposing enormous economic costs. The impacts are happening now and will intensify dramatically unless global emissions are rapidly reduced.
      </div>`
  },
  'post-3': {
    badge:    'BIODIVERSITY LOSS',
    img:      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=85',
    title:    'Effect of Biodiversity Loss',
    subtitle: 'The Sixth Mass Extinction and What It Means for Humanity',
    author:   'IT Student Team',
    date:     'March 2026',
    read:     '12 min read',
    tags:     ['#Extinction', '#Ecosystem Services', '#Conservation'],
    body: `
      <p>We are living through Earth's sixth mass extinction event, with species vanishing at rates 1,000 to 10,000 times faster than natural background extinction rates. The loss of biodiversity doesn't just impoverish nature — it destabilizes the ecological systems that sustain human civilization. This is not a problem for tomorrow; it is a crisis unfolding today.</p>

<h3>● The Sixth Mass Extinction</h3>
      <p>Earth has experienced five previous mass extinction events, each wiping out over 75% of species. Most were caused by natural catastrophes like asteroid impacts or massive volcanic eruptions. Today, the sixth mass extinction is unfolding — but this time, the cause is entirely human. Current extinction rates are estimated at 100 to 1,000 times higher than natural background rates. Scientists estimate that Earth is losing 137 species every single day.</p>

      <h3>● Primary Causes of Biodiversity Loss</h3>
      <p>The leading cause is habitat destruction — forests, wetlands, coral reefs, and grasslands being cleared for agriculture, logging, urbanization, and infrastructure. The Philippines loses approximately 47,000 hectares of forest annually. Climate change is pushing species beyond their tolerance limits faster than they can adapt. Pollution, overexploitation, and invasive species compound these threats.</p>

<h3>● Five Major Effects of Biodiversity Loss</h3>
      <div class="post-example"><strong>Ecosystem Collapse:</strong> Losing a single keystone species can trigger chain reactions through entire food webs, destabilizing ecosystems and reducing their resilience.</div>
      <div class="post-example"><strong>Food System Failure:</strong> ~75% of global food crops depend on animal pollinators. Declining bee populations worldwide directly threaten agricultural productivity and food security.</div>
      <div class="post-example"><strong>Loss of Medicines:</strong> Over 50% of modern pharmaceuticals are derived from natural organisms. Each extinction permanently erases genetic material that could hold future cures.</div>
      <div class="post-example"><strong>Accelerated Climate Change:</strong> Forests and wetlands are critical carbon sinks. Destroying them reduces Earth's capacity to regulate climate, worsening global warming.</div>
      <div class="post-example"><strong>Disruption of Ecosystem Services:</strong> Nature provides clean air, water, nutrient cycling, and soil formation — services estimated at $125 trillion annually. Biodiversity decline degrades all of them.</div>

      <div class="post-example">
        <span class="example-tag">🇵🇭 Philippine Context</span>
        <p>The Philippine Eagle, the national bird, is one of the world's rarest birds, with fewer than 400 breeding pairs remaining. Its survival is threatened by deforestation and hunting. The Philippines is one of 17 megadiverse countries, with ~52,000 native species — thousands found nowhere else on Earth.</p>
      </div>

      <div class="post-summary">
        <strong>Quick Summary:</strong> Habitat destruction, climate change, pollution, overexploitation, and invasive species are driving species to extinction 1,000+ times faster than natural rates. This sixth mass extinction threatens food security, human medicine, climate stability, and the fundamental ecological services sustaining human civilization.
      </div>`
  }
};

/* ── ARTICLE MODAL ────────────────────────────────────────── */
const modalOverlay = document.getElementById('article-modal');
const modalClose   = document.getElementById('modal-close');

function openModal(postId) {
  const p = POSTS[postId];
  if (!p) return;
  document.getElementById('modal-hero-img').style.backgroundImage = `url('${p.img}')`;
  document.getElementById('modal-badge').textContent = p.badge;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-subtitle').textContent = p.subtitle;
  document.getElementById('modal-meta').innerHTML = `
    <span class="meta-item">👤 ${p.author}</span>
    <span class="meta-item">📅 ${p.date}</span>
    <span class="meta-item">⏱ ${p.read}</span>
    <span class="meta-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</span>`;
  document.getElementById('modal-body').innerHTML = p.body;

  const srcBox = document.getElementById('modal-source-box');
  if (p.source) {
    srcBox.innerHTML = `<span class="source-label">📚 Source</span><a href="${p.source.url}" target="_blank" rel="noopener">${p.source.text} ↗</a>`;
    srcBox.style.display = 'block';
  } else {
    srcBox.style.display = 'none';
  }

  modalOverlay.classList.add('open');
  document.documentElement.classList.add('overlay-open');
  modalOverlay.querySelector('.modal-box').scrollTop = 0;
}

function closeModal() {
  modalOverlay.classList.remove('open');
  const topicOpen = document.getElementById('topic-page') && document.getElementById('topic-page').classList.contains('open');
  if (!topicOpen) {
    document.documentElement.classList.remove('overlay-open');
  }
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ============================================================
   TOPIC POSTS DATA — Full articles with references
   ============================================================ */


const TOPIC_POSTS = {
  warming: [
    {
      id: 'warming-1',
      badge: 'GLOBAL WARMING',
      title: 'The Causes of Global Warming',
      subtitle: 'Understanding the Human and Natural Forces Heating Our Planet',
      img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',
      author: 'Arthur Jake Rosario', date: 'March 2026', read: '7 min read',
      tags: ['#Fossil Fuels', '#Greenhouse Gases', '#Carbon Emissions'],
      body: `
        <p>Global warming refers to the long-term rise in Earth's average surface temperature caused by the accumulation of greenhouse gases in the atmosphere. While natural factors such as volcanic eruptions and solar variation have historically influenced Earth's climate, scientists have reached overwhelming consensus that the current warming trend is driven primarily by human activities. Since the Industrial Revolution, atmospheric CO₂ concentrations have risen from around 280 ppm to over 420 ppm — a level not seen in at least 800,000 years.</p>

        <h3>● Burning of Fossil Fuels</h3>
        <p>The single largest cause of global warming is the combustion of fossil fuels — coal, oil, and natural gas — for energy. When burned, these fuels release carbon dioxide (CO₂) and other greenhouse gases that have been locked underground for millions of years. Power plants, vehicles, aircraft, and industrial facilities collectively release over 36 billion metric tons of CO₂ annually.</p>

        <h3>● Main Human Causes</h3>

        <div class="post-example">
          <strong>Burning Fossil Fuels:</strong> Coal, oil, and natural gas release massive amounts of CO₂ when burned for electricity, transportation, and industry — the single largest contributor to global warming.
        </div>

        <div class="post-example">
          <strong>Deforestation:</strong> Trees absorb CO₂. When forests are cleared — as in Palawan or the Amazon — that stored carbon is released back into the atmosphere.
        </div>

        <div class="post-example">
          <strong>Agriculture:</strong> Livestock farming produces methane, while rice paddies and synthetic fertilizers release nitrous oxide — both potent greenhouse gases.
        </div>

        <div class="post-example">
          <strong>Industrial Processes:</strong> Cement, steel, and chemical manufacturing emit CO₂ and other greenhouse gases as direct byproducts of production.
        </div>

        <div class="post-example">
          <strong>Waste & Landfills:</strong> Decomposing organic waste in landfills produces methane — a gas 25× more potent than CO₂ over a 100-year period.
        </div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>Metro Manila's millions of jeepneys, tricycles, and private vehicles contribute significantly to urban air pollution and CO₂ emissions. The Philippines, while a minor global emitter, is considered among the most climate-vulnerable nations in the world.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Human activities — increased greenhouse gases → trapped heat → rising global temperatures → cascading environmental and humanitarian consequences.
        </div>
      `
    },
    {
      id: 'warming-2',
      badge: 'GLOBAL WARMING',
      title: 'Greenhouse Gas Emissions: A Deep Dive',
      subtitle: 'How Different Industries Contribute to the Climate Crisis',
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      author: 'Christian Montes', date: 'March 2026', read: '6 min read',
      tags: ['#CO2', '#Industry', '#Energy'],
      body: `
        <p>Greenhouse gases (GHGs) are the primary drivers of global warming. Understanding which sectors emit the most — and why — is essential for designing effective climate solutions. Energy production, transportation, and industrial processes collectively account for the vast majority of global GHG emissions.</p>

<h3>● Breaking Down Global Emissions by Sector</h3>
        <div class="post-example"><strong>Energy (Electricity & Heat):</strong> ~34% of global GHG emissions. Burning coal, oil, and gas for electricity and heat is the largest single source.</div>
        <div class="post-example"><strong>Transportation:</strong> ~16% globally. Road vehicles, aviation, and shipping all burn fossil fuels. In the Philippines, jeepneys and motorcycles dominate urban transport emissions.</div>
        <div class="post-example"><strong>Agriculture:</strong> ~18–20%. Livestock methane, rice paddies, and nitrogen fertilizers contribute enormously, especially in Southeast Asia.</div>
        <div class="post-example"><strong>Industry:</strong> ~23%. Cement, steel, chemicals, and mining release CO₂ and other GHGs both from fuel combustion and industrial reactions.</div>
        <div class="post-example"><strong>Buildings:</strong> ~6%. Heating, cooling, and cooking in homes and commercial buildings consume vast amounts of energy.</div>

        <h3>● Why CO₂ Isn't the Only Problem</h3>
        <p>While CO₂ is the most abundant GHG, methane (CH₄) is 28–86× more potent over different time periods. Nitrous oxide (N₂O) is 265× more potent. Fluorinated gases used in refrigeration can be thousands of times more powerful. Addressing all GHGs — not just CO₂ — is critical for meaningful climate action.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines' emissions come primarily from energy (power generation and transport), agriculture (rice and livestock), and land-use change. The country has pledged to transition to 35% renewable energy in its power mix by 2030 under the Renewable Energy Act.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Greenhouse gas emissions span multiple sectors — energy, transport, agriculture, industry, and buildings. Effective climate action requires targeting all sectors simultaneously, with the largest reductions needed in energy and transportation.
        </div>
      `
    },
    {
      id: 'warming-3',
      badge: 'GLOBAL WARMING',
      title: 'Deforestation and Carbon Loss',
      subtitle: 'How We Are Losing the Planet\'s Carbon Sink',
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      author: 'Leolah Mae Camposano', date: 'March 2026', read: '5 min read',
      tags: ['#Deforestation', '#Carbon', '#Trees'],
      body: `
        <p>Forests are Earth's most powerful terrestrial carbon sinks — they absorb CO₂ through photosynthesis and lock it in their biomass and soil for centuries. When forests are cleared for agriculture, logging, or urban expansion, that stored carbon is released back into the atmosphere almost immediately. Deforestation accounts for approximately 10–15% of global CO₂ emissions annually.</p>

<h3>● Why Forests Matter for Climate</h3>
        <p>Tropical forests in the Amazon, Congo Basin, and Southeast Asia store the most carbon per hectare of any terrestrial ecosystem. The Amazon alone stores an estimated 150–200 billion tons of carbon. When these forests burn or are cut down, they transform from carbon sinks into carbon sources — emitting far more CO₂ than they absorb.</p>

        <h3>● Deforestation in the Philippines</h3>
        <p>The Philippines has one of the highest historical deforestation rates in Southeast Asia. Forest cover dropped from approximately 70% in the early 1900s to less than 20% today. The main drivers are conversion to agriculture (coconut, banana, palm oil), illegal logging, and urban expansion. The loss of forest on steep slopes also directly increases the risk of landslides and flooding during typhoons.</p>

        <div class="post-example">
          <strong>Double Impact:</strong> Deforestation both releases stored carbon AND removes future carbon absorption capacity. A cleared forest can no longer absorb the CO₂ it would have sequestered over the next century — a compounding loss.
        </div>

        <h3>● Reforestation as a Solution</h3>
        <p>The Philippines' National Greening Program (NGP) targeted planting 1.5 billion trees across 1.5 million hectares by 2016. While outcomes have been mixed, such programs highlight the importance of forest restoration as both a climate mitigation and biodiversity conservation strategy. Community-based forest management (CBFM) involving indigenous peoples and local communities has shown the most sustainable outcomes.</p>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Deforestation destroys one of Earth's most critical carbon sinks, releases stored carbon, and eliminates future absorption capacity. Protecting and restoring forests is among the most cost-effective climate solutions available.
        </div>
      `
    },
    {
      id: 'warming-4',
      badge: 'GLOBAL WARMING',
      title: 'Methane: The Hidden Threat',
      subtitle: 'Understanding Methane Emissions and Their Impact',
      img: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80',
      author: 'Rhobbie Roxas', date: 'March 2026', read: '6 min read',
      tags: ['#Methane', '#Livestock', '#Agriculture'],
      body: `
        <p>While carbon dioxide (CO₂) dominates the public conversation on greenhouse gases, methane (CH₄) is arguably the more urgent short-term threat. Methane is approximately 28–36 times more potent than CO₂ over a 100-year period — and 80 times more potent over 20 years. Reducing methane emissions is one of the fastest ways to slow near-term warming.</p>

<h3>● Where Does Methane Come From?</h3>
        <div class="post-example"><strong>Livestock (Enteric Fermentation):</strong> Cattle, buffalo, sheep, and goats produce methane as a natural byproduct of digestion. Globally, livestock account for ~14.5% of all greenhouse gas emissions (FAO).</div>
        <div class="post-example"><strong>Rice Paddies:</strong> Flooded rice fields create anaerobic conditions where bacteria produce methane. Rice cultivation is responsible for ~10–12% of global methane emissions — a critical issue for the Philippines, one of Asia's major rice-producing nations.</div>
        <div class="post-example"><strong>Landfills:</strong> Decomposing organic waste in landfills produces methane. Open dump sites, still common in many Philippine municipalities, are significant local sources.</div>
        <div class="post-example"><strong>Fossil Fuel Operations:</strong> Natural gas extraction, coal mining, and oil production leak significant quantities of methane — often undetected and unmeasured.</div>

        <h3>● Why Methane Reduction Matters Now</h3>
        <p>Methane stays in the atmosphere for only about 12 years, compared to CO₂ which can persist for centuries. This means reducing methane emissions today produces measurable temperature benefits within a decade — offering a critical near-term lever for slowing climate change while longer-term CO₂ reductions take effect.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines is one of the top global rice producers, with over 4 million hectares of rice paddies. Scientists and agricultural researchers are developing methane-reduced rice varieties and alternate wetting-and-drying irrigation techniques to cut methane from paddy fields without sacrificing yields.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Methane is a far more potent greenhouse gas than CO₂ in the short term. Reducing methane from livestock, rice paddies, landfills, and fossil fuel operations is one of the fastest available strategies for slowing near-term climate change.
        </div>
      `
    },
    {
      id: 'warming-5',
      badge: 'GLOBAL WARMING',
      title: 'Global Carbon Dioxide Levels',
      subtitle: 'Tracking CO₂ Concentrations Through the Centuries',
      img: 'https://images.unsplash.com/photo-1527666550448-4c8fef8b88c5?w=800&q=80',
      author: 'Prince Charles Santos', date: 'March 2026', read: '7 min read',
      tags: ['#CO2', '#Atmosphere', '#Data'],
      body: `
        <p>Atmospheric carbon dioxide (CO₂) is the most important long-lived greenhouse gas driving current global warming. Its concentration in the atmosphere is measured in parts per million (ppm) — and for the first time in recorded human history, it has surpassed 420 ppm. Ice core data confirms that CO₂ has not been this high in at least 800,000 years.</p>

<h3>● The Keeling Curve: A Record of Rising CO₂</h3>
        <p>In 1958, scientist Charles David Keeling began continuously measuring atmospheric CO₂ at NOAA's Mauna Loa Observatory in Hawaii. What emerged — the Keeling Curve — is one of the most important scientific datasets in history. It shows CO₂ rising steadily year after year, with seasonal fluctuations as Northern Hemisphere vegetation absorbs and releases carbon through growing and dormant seasons.</p>

        <h3>● CO₂ Through History</h3>
        <div class="post-example"><strong>Pre-Industrial (before 1750):</strong> ~280 ppm. Stable for thousands of years.</div>
        <div class="post-example"><strong>1900:</strong> ~296 ppm. Beginning of industrial-era acceleration.</div>
        <div class="post-example"><strong>1960:</strong> ~315 ppm. Keeling begins measurements; acceleration visible.</div>
        <div class="post-example"><strong>2000:</strong> ~370 ppm. Rise accelerating with growing industrialization.</div>
        <div class="post-example"><strong>2023:</strong> 421 ppm. A level not seen for 800,000+ years based on ice core data.</div>

        <h3>● Why CO₂ Levels Matter</h3>
        <p>Each additional ppm of CO₂ represents billions of tons of carbon added to the atmosphere. Higher CO₂ concentrations mean more heat trapped, higher global temperatures, more acidic oceans, and greater impacts on ecosystems and human societies. The current rate of increase — approximately 2–3 ppm per year — is unprecedented in the geologic record.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>While the Philippines contributes less than 1% of global CO₂ emissions, Filipinos breathe the same atmosphere as the rest of the world — and bear some of the most severe consequences of rising CO₂ concentrations through more intense typhoons, sea level rise, and coral bleaching in the Coral Triangle.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Atmospheric CO₂ has risen from ~280 ppm pre-industrial to over 420 ppm today — a 50% increase driven almost entirely by human activities. This is the primary driver of global warming and represents a level of atmospheric change unprecedented in human history.
        </div>
      `
    },
    {
      id: 'warming-6',
      badge: 'GLOBAL WARMING',
      title: 'Renewable Energy Solutions',
      subtitle: 'Moving Beyond Fossil Fuels for a Sustainable Future',
      img: 'https://images.unsplash.com/photo-1509391366360-2e938286db4c?w=800&q=80',
      author: 'Zandra Gabriela Arante', date: 'March 2026', read: '8 min read',
      tags: ['#Renewable', '#Energy', '#Solutions'],
      body: `
        <p>Transitioning from fossil fuels to renewable energy sources is the single most important action humanity can take to reduce greenhouse gas emissions and slow global warming. Solar, wind, hydroelectric, geothermal, and ocean energy technologies have become dramatically more affordable and reliable over the past decade — making clean energy an economically compelling alternative worldwide.</p>

<h3>● Types of Renewable Energy</h3>
        <div class="post-example"><strong>Solar Energy:</strong> The cost of solar photovoltaic (PV) panels has dropped by over 90% since 2010. Solar is now the cheapest source of electricity in history in many parts of the world.</div>
        <div class="post-example"><strong>Wind Energy:</strong> Onshore and offshore wind turbines generate clean electricity from moving air. Wind is already the cheapest electricity source in some regions.</div>
        <div class="post-example"><strong>Geothermal Energy:</strong> The Philippines is the world's second-largest producer of geothermal energy, which provides approximately 27% of its electricity from heat within the Earth.</div>
        <div class="post-example"><strong>Hydroelectric Power:</strong> Currently provides ~16% of global electricity. The Philippines has significant hydropower resources, especially in Mindanao.</div>
        <div class="post-example"><strong>Ocean & Tidal Energy:</strong> The Philippines' extensive coastline offers significant potential for wave, tidal, and ocean thermal energy conversion (OTEC) technologies still under development.</div>

        <h3>● The Philippine Renewable Energy Landscape</h3>
        <p>The Philippines has set an ambitious target for 35% of its energy mix to come from renewable sources by 2030, rising to 50% by 2040, under the Renewable Energy Act (RA 9513). As of 2023, renewables account for approximately 21% of the Philippines' power generation. The country aims to add 10,000 MW of solar capacity over the next decade while maintaining its world-leading geothermal sector.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines retired its last nuclear facility (BNPP in Bataan) and currently debates reopening it. Meanwhile, solar home systems are being deployed in off-grid islands through the DOE's Household Electrification Program, bringing clean energy to the most remote Filipinos while reducing diesel dependence.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Renewable energy — solar, wind, geothermal, hydro — is now cost-competitive with fossil fuels and represents the primary pathway for reducing global CO₂ emissions. The Philippines has strong renewable resources and ambitious targets, with geothermal already a world-class achievement.
        </div>
      `
    },
    {
      id: 'warming-7',
      badge: 'GLOBAL WARMING',
      title: 'The Role of Ocean Currents',
      subtitle: 'How Oceans Influence Global Temperature Patterns',
      img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
      author: 'Caleb Nicholas Cofuentes', date: 'March 2026', read: '6 min read',
      tags: ['#Ocean', '#Currents', '#Temperature'],
      body: `
        <p>The world's oceans are not passive features of the Earth's climate system — they are active regulators of global temperature, carbon storage, and weather patterns. Ocean currents act as a massive conveyor belt of heat energy, transporting warm water from the tropics to polar regions and cold water back toward the equator. As global warming disrupts these systems, the consequences for global climate stability are profound.</p>

<h3>● How Ocean Currents Work</h3>
        <p>The global ocean circulation system — known as the thermohaline circulation or "Ocean Conveyor Belt" — is driven by differences in water temperature and salinity. Warm, salty surface water flows from tropical regions toward the poles, releases heat to the atmosphere (warming countries like Ireland and Norway), then cools and sinks. This deep, cold water flows back toward the tropics, completing the cycle over hundreds to thousands of years.</p>

        <h3>● Oceans as Carbon Sinks</h3>
        <p>The world's oceans absorb approximately 25–30% of the CO₂ that humans emit each year — acting as a vital buffer against even faster warming. However, this absorbed CO₂ is making seawater more acidic (ocean acidification), threatening marine life. As oceans warm, their ability to absorb CO₂ also decreases — creating a positive feedback loop where warmer oceans absorb less carbon, leaving more CO₂ in the atmosphere to drive further warming.</p>

        <h3>● Disruption of Ocean Currents</h3>
        <p>Scientists are concerned that climate change could weaken or disrupt the Atlantic Meridional Overturning Circulation (AMOC), a critical component of the global conveyor belt. A weakened AMOC could lead to significantly colder winters in Europe, disrupted monsoons in Africa and Asia, stronger hurricanes in the Atlantic, and accelerated sea level rise along eastern North America — affecting billions of people.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>Philippine sea surface temperatures have risen measurably over recent decades. The Philippine Sea and Coral Triangle are experiencing more frequent marine heat waves, leading to mass coral bleaching events. The warming of the Pacific Ocean also intensifies El Niño and La Niña events, causing more severe droughts and flooding in the Philippines.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Oceans regulate Earth's climate by absorbing heat and CO₂ and distributing thermal energy through ocean currents. Global warming is disrupting these systems, threatening to destabilize weather patterns, accelerate sea level rise, and reduce the ocean's capacity to buffer further warming.
        </div>
      `
    },
    {
      id: 'warming-8',
      badge: 'GLOBAL WARMING',
      title: 'Urban Heat Islands in the Philippines',
      subtitle: 'How Cities Amplify Global Warming Effects Locally',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      author: 'Edralin Ramos', date: 'March 2026', read: '5 min read',
      tags: ['#Urban', '#Philippines', '#Heat'],
      body: `
        <p>The urban heat island (UHI) effect occurs when cities experience significantly higher temperatures than surrounding rural areas. Concrete, asphalt, steel, and glass absorb far more solar radiation than vegetation does — and they release this stored heat at night, keeping urban areas warm around the clock. In Metro Manila and other Philippine cities, UHI effects can raise local temperatures by 2–5°C above rural surroundings.</p>

<h3>● Why Philippine Cities Are Especially Vulnerable</h3>
        <p>The Philippines combines tropical heat, rapid urbanization, high population density, and limited green space — creating ideal conditions for intense urban heat islands. Metro Manila, one of the world's most densely populated megacities with over 13 million residents, has seen green spaces replaced by concrete in nearly every barangay over the past three decades. The lack of urban tree canopy, combined with heat-absorbing infrastructure, creates "heat traps" that worsen during El Niño events.</p>

        <h3>● Health and Social Impacts</h3>
        <p>Urban heat islands directly harm human health. Heat stroke and heat exhaustion rates rise significantly during hot season. The elderly, outdoor workers (construction workers, tricycle drivers, market vendors), and communities without air conditioning — often the urban poor — suffer disproportionately. The Philippine heat index — which combines temperature and humidity — regularly exceeds 42–48°C in Metro Manila during April and May.</p>

        <h3>● Solutions Being Explored</h3>
        <div class="post-example"><strong>Urban Greening:</strong> The Urban Green Space Act (RA 11038) requires cities to allocate green spaces. Tree-planting programs in Marikina, Quezon City, and Davao are showing measurable cooling effects.</div>
        <div class="post-example"><strong>Cool Roofs and Pavements:</strong> White or reflective roof surfaces reduce heat absorption. Pasig City has piloted cool roof programs in public buildings.</div>
        <div class="post-example"><strong>Green Buildings:</strong> BERDE (Building for Ecologically Responsive Design Excellence) certification encourages passive cooling, green walls, and rooftop gardens.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>PAGASA has documented a clear urban warming trend in Metro Manila — approximately 1–2°C of additional warming attributable to urbanization above the global baseline. Cities like Cagayan de Oro and Davao are using urban heat mapping to guide their master planning and green space development.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Urban heat islands are a localized amplification of global warming, created by city infrastructure that absorbs and traps heat. Philippine cities are especially vulnerable given tropical climate, rapid urbanization, and limited green space — but solutions like urban greening and cool roofs offer effective countermeasures.
        </div>
      `
    },
    {
      id: 'warming-9',
      badge: 'GLOBAL WARMING',
      title: 'International Climate Agreements',
      subtitle: 'How Nations Are Cooperating to Reduce Emissions',
      img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
      author: 'Cherlyn Lavapie', date: 'March 2026', read: '7 min read',
      tags: ['#Paris Agreement', '#Policy', '#UNFCCC'],
      body: `
        <p>Addressing global warming requires unprecedented international cooperation. No single country — not even the largest emitters — can solve climate change alone. The framework of international climate agreements, beginning with the United Nations Framework Convention on Climate Change (UNFCCC) in 1992 and evolving through the Paris Agreement in 2015, represents humanity's collective response to the greatest environmental challenge in history.</p>

<h3>● Key International Climate Agreements</h3>
        <div class="post-example"><strong>UNFCCC (1992):</strong> Established the framework for international climate negotiations. Adopted at the Rio Earth Summit, it recognized climate change as a global threat requiring international cooperation.</div>
        <div class="post-example"><strong>Kyoto Protocol (1997):</strong> First binding international agreement requiring developed countries to reduce GHG emissions. Established carbon markets and flexibility mechanisms.</div>
        <div class="post-example"><strong>Paris Agreement (2015):</strong> Landmark agreement committing 196 parties to limiting global warming to well below 2°C, with efforts toward 1.5°C. Each country submits Nationally Determined Contributions (NDCs).</div>
        <div class="post-example"><strong>COP28 UAE Declaration (2023):</strong> Committed nations to transitioning away from fossil fuels — the first explicit mention of fossil fuel phase-down in a COP agreement.</div>

        <h3>● The Philippines' Climate Commitments</h3>
        <p>The Philippines has submitted its Nationally Determined Contribution (NDC) to the UNFCCC, pledging to reduce greenhouse gas emissions by 75% by 2030 relative to its business-as-usual scenario. Of this 75%, approximately 72.29% is conditional on receiving international financial and technological support, while 2.71% is unconditional. This reflects the Philippines' position as a developing nation that contributes minimally to global emissions but faces catastrophic climate impacts.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines is an active participant in climate negotiations and has consistently advocated for ambitious emissions reductions from major emitting countries. As a "Loss and Damage" champion, the Philippines has pushed for compensation mechanisms for developing nations that suffer climate impacts they did not cause — a position that gained traction at COP27 in Egypt (2022) and COP28 in Dubai (2023).</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> International climate agreements — especially the Paris Agreement — provide the framework for coordinated global action on climate change. The Philippines, despite minimal emissions, is an active advocate for climate justice and ambitious global action, particularly on Loss and Damage for vulnerable nations.
        </div>
      `
    }
  ],

  climate: [
    {
      id: 'climate-1',
      badge: 'CLIMATE IMPACT',
      title: 'Climate Change and Its Impact',
      subtitle: 'How a Warming Planet is Reshaping Life on Earth',
      img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      author: 'Jonalyn Tablizo', date: 'March 2026', read: '8 min read',
      tags: ['#Sea Level Rise', '#Extreme Weather', '#Food Security'],
      body: `
        <p>Rising seas, intensifying storms, prolonged droughts, and shifting seasons — climate change is no longer a future threat. Its impacts are being felt right now, across every region of the globe. The IPCC warns that if global warming exceeds 1.5°C above pre-industrial levels, consequences for ecosystems and human societies will be severe and widespread. We are currently at approximately 1.1°C of warming — and rising faster than at any point in human history.</p>

<h3>● The Scope of Climate Impacts</h3>
        <p>Climate change impacts span every aspect of human life and the natural world. Rising sea levels threaten coastal communities. More intense storms bring greater destruction. Shifting rainfall patterns disrupt agriculture. Warming oceans bleach coral reefs. Heat waves threaten human health. The interconnected nature of these impacts means that no country, ecosystem, or community is immune — though the most vulnerable people in the least developed nations suffer the most despite contributing the least to the problem.</p>

        <h3>● Key Impacts at a Glance</h3>
        <div class="post-example"><strong>Sea Level Rise:</strong> Global sea levels are rising at 3.4–3.7mm per year — double the 20th century average. Accelerating melt from Greenland and Antarctica threatens to add meters of rise by 2100.</div>
        <div class="post-example"><strong>Extreme Weather:</strong> Typhoons, hurricanes, and cyclones are becoming more intense. The Philippines experiences about 20 per year — some now reaching Category 5 intensity more frequently.</div>
        <div class="post-example"><strong>Food Insecurity:</strong> IPCC estimates food production could decline by 2–6% per decade as climate change disrupts agriculture, fisheries, and water availability.</div>
        <div class="post-example"><strong>Biodiversity Loss:</strong> Up to 50% of species face unsuitable habitats by 2100 if warming reaches 4°C. Coral reefs could be virtually eliminated at 2°C.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines loses an estimated $6–9 billion annually to climate-related disasters — 3–5% of national GDP. As one of the most climate-vulnerable nations, the Philippines faces compounding threats: typhoons, sea level rise, coral bleaching, agricultural disruption, and dengue expansion — all intensifying with rising global temperatures.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Climate change is reshaping life on Earth through rising seas, intensifying storms, agricultural disruption, biodiversity loss, and health threats. For the Philippines, these impacts are already severe and will worsen dramatically without rapid global emissions reductions.
        </div>
      `
    },
    {
      id: 'climate-2',
      badge: 'CLIMATE IMPACT',
      title: 'Rising Sea Levels and Coastal Threats',
      subtitle: 'Why Coastal Communities Are on the Front Line',
      img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
      author: 'Caleb Nicholas Cofuentes', date: 'March 2026', read: '7 min read',
      tags: ['#Sea Level', '#Coastal', '#Philippines'],
      body: `
        <p>Global sea levels are rising at an accelerating rate — currently approximately 3.7 mm per year globally, compared to around 1.7 mm per year throughout most of the 20th century. By 2100, sea levels could rise by 0.3–1 meter or more above current levels, depending on how quickly greenhouse gas emissions are reduced. For a country like the Philippines — composed of over 7,641 islands with 36,289 kilometers of coastline — this represents an existential threat.</p>

<h3>● Why Sea Levels Are Rising</h3>
        <p>Two primary factors drive sea level rise: thermal expansion (as ocean water warms, it expands) and the melting of glaciers and ice sheets. Since 1901, global sea levels have risen approximately 20 cm. Greenland and Antarctica — which together hold enough ice to raise sea levels by over 65 meters — are melting faster than models predicted just a decade ago.</p>

        <h3>● Impacts on the Philippines</h3>
        <div class="post-example"><strong>Nuisance Flooding:</strong> Low-lying coastal barangays in Manila, Cebu, and Zamboanga increasingly experience "sunny day flooding" — inundation at high tide even without storms, as relative sea levels rise.</div>
        <div class="post-example"><strong>Storm Surge Amplification:</strong> Higher baseline sea levels mean storm surges during typhoons reach further inland and cause greater damage. Haiyan's 5–7 meter storm surge in 2013 would be even more devastating with additional sea level rise.</div>
        <div class="post-example"><strong>Saltwater Intrusion:</strong> Rising seas drive salt water into freshwater aquifers and agricultural land. Coastal rice fields in Mindanao and Luzon are experiencing salinization, reducing yields.</div>
        <div class="post-example"><strong>Displacement:</strong> An estimated 40 million Filipinos live in coastal areas vulnerable to sea level rise. Without adaptation, millions could be displaced from their homes by 2100.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>Manila Bay has some of the fastest measured sea level rise globally — approximately 5–10 mm per year — due to a combination of global sea level rise and rapid land subsidence from excessive groundwater extraction. This compound effect makes Manila's coast far more vulnerable than global averages suggest.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Rising sea levels threaten the Philippines' 36,289 km of coastline through flooding, storm surge amplification, saltwater intrusion, and displacement of millions. Manila Bay faces some of the world's fastest relative sea level rise due to combined global warming and local land subsidence.
        </div>
      `
    },
    {
      id: 'climate-3',
      badge: 'CLIMATE IMPACT',
      title: 'Melting Ice and Glaciers',
      subtitle: 'The Frozen World Is Thawing Faster Than Expected',
      img: 'https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=800&q=80',
      author: 'Rhobbie Roxas', date: 'March 2026', read: '6 min read',
      tags: ['#Arctic', '#Glaciers', '#Ice'],
      body: `
        <p>The world's cryosphere — its ice-covered regions — is in rapid retreat. Arctic sea ice has declined by more than 40% in extent since satellite measurements began in 1979. Mountain glaciers from the Himalayas to the Andes are losing mass at unprecedented rates. The Greenland and Antarctic ice sheets, which hold enough ice to raise global sea levels by over 65 meters combined, are melting faster than scientists projected even a decade ago.</p>

<h3>● The Arctic Is Warming Four Times Faster</h3>
        <p>The Arctic is warming approximately four times faster than the global average — a phenomenon called "Arctic amplification." As white sea ice melts and is replaced by dark open ocean water, the ocean absorbs more solar radiation instead of reflecting it, accelerating warming further. Scientists warn that the Arctic could experience ice-free summers before 2050, potentially within decades.</p>

        <h3>● Consequences of Melting Ice</h3>
        <div class="post-example"><strong>Sea Level Rise:</strong> Melting glaciers and ice sheets are the dominant contributors to current and projected sea level rise. Greenland's ice sheet alone has lost 4.7 trillion tons of ice since 2002.</div>
        <div class="post-example"><strong>Freshwater Scarcity:</strong> Hundreds of millions of people — particularly in South Asia, the Andes, and Central Asia — depend on glacial meltwater for drinking, agriculture, and hydropower. As glaciers retreat, summer water supply becomes unpredictable and eventually declines.</div>
        <div class="post-example"><strong>Permafrost Thaw:</strong> Thawing permafrost in Siberia, Alaska, and northern Canada releases stored methane and CO₂, creating a positive feedback that further accelerates warming.</div>
        <div class="post-example"><strong>Disrupted Weather Patterns:</strong> Loss of Arctic sea ice changes temperature gradients between the poles and tropics, disrupting the jet stream and contributing to more extreme weather events at mid-latitudes.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>While the Philippines has no glaciers, melting ice worldwide directly contributes to the sea level rise threatening its 36,289 km of coastline. Additionally, the disruption of Arctic and Antarctic systems affects global weather patterns — including the behavior of Pacific typhoons that strike the Philippines annually.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Global ice is melting at unprecedented rates — the Arctic is warming 4× faster than the global average, glaciers worldwide are retreating, and ice sheets are losing trillions of tons of mass. Consequences include accelerating sea level rise, freshwater scarcity, permafrost methane release, and disrupted global weather patterns.
        </div>
      `
    },
    {
      id: 'climate-4',
      badge: 'CLIMATE IMPACT',
      title: 'Extreme Weather Events',
      subtitle: 'Climate Change Supercharging Natural Disasters',
      img: 'https://images.unsplash.com/photo-1501684130949-7e26f3d08aca?w=800&q=80',
      author: 'Leolah Mae Camposano', date: 'March 2026', read: '7 min read',
      tags: ['#Typhoon', '#Floods', '#Disaster'],
      body: `
        <p>One of the most direct and devastating consequences of climate change is the intensification of extreme weather events. While no single storm, drought, or flood can be attributed solely to climate change, climate scientists can now measure how much global warming has increased the probability and severity of specific events. The verdict is unambiguous: a warmer atmosphere holds more moisture, releases more energy, and creates the conditions for more destructive extreme weather.</p>

<h3>● How Climate Change Amplifies Extreme Weather</h3>
        <div class="post-example"><strong>Warmer Atmosphere = More Moisture:</strong> A 1°C warmer atmosphere holds 7% more water vapor (Clausius-Clapeyron relationship). This means heavier rainfall, more intense floods, and stronger storm systems when weather systems develop.</div>
        <div class="post-example"><strong>Warmer Oceans = More Powerful Typhoons:</strong> Tropical cyclones get their energy from warm ocean surface water. As oceans warm, storms can rapidly intensify to higher categories more often and maintain intensity for longer.</div>
        <div class="post-example"><strong>Disrupted Jet Stream:</strong> Loss of Arctic sea ice disrupts the polar jet stream, causing weather systems to "stall" — leading to more prolonged droughts, heat waves, and flooding events.</div>
        <div class="post-example"><strong>Rising Sea Levels + Storms:</strong> Higher baseline sea levels mean storm surges during typhoons penetrate further inland — amplifying flood damage even if storm intensity remains constant.</div>

        <h3>● Philippine Experience with Extreme Weather</h3>
        <p>The Philippines is one of the world's most disaster-prone nations, experiencing an average of 20 tropical cyclones annually. In recent decades, the country has faced increasingly destructive super typhoons. Haiyan (2013) — with 315 km/h winds and a 5–7 meter storm surge — killed 6,300+ people. Odette (2021) caused P52 billion in damage. Karding (2022) made four landfalls in rapid succession. Each successive super typhoon sets new records for intensity or damage.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>Studies by the World Weather Attribution project have found that climate change made several recent Philippine typhoons significantly more intense and wet than they would have been without global warming. The NDRRMC estimates that extreme weather events cost the Philippines between 2–3% of GDP annually — a figure expected to rise sharply with continued warming.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Climate change is intensifying extreme weather events — making typhoons stronger, floods heavier, droughts more severe, and heat waves more lethal. For the Philippines, which sits in the world's most active typhoon belt, the consequences are already devastating and will worsen without global action.
        </div>
      `
    },
    {
      id: 'climate-5',
      badge: 'CLIMATE IMPACT',
      title: 'Food Security in a Changing Climate',
      subtitle: 'How Climate Change Threatens Global Food Production',
      img: 'https://images.unsplash.com/photo-1500000046051-852373e5973f?w=800&q=80',
      author: 'Arthur Jake Rosario', date: 'March 2026', read: '7 min read',
      tags: ['#Food', '#Agriculture', '#Security'],
      body: `
        <p>Feeding a global population of 8 billion people — projected to grow to nearly 10 billion by 2050 — is already one of humanity's greatest challenges. Climate change is making it dramatically harder. Rising temperatures, shifting monsoon patterns, more frequent droughts and floods, saltwater intrusion, and the expansion of agricultural pests are all reducing the productivity of the world's farmland at precisely the moment when we need it most.</p>

<h3>● How Climate Change Disrupts Food Production</h3>
        <div class="post-example"><strong>Heat Stress on Crops:</strong> Most major food crops — rice, wheat, maize — have optimal growing temperature ranges. Above-threshold temperatures during flowering can reduce yields by 10–25% or more. Every degree of warming reduces global wheat yields by 6% and rice yields by 3–8%.</div>
        <div class="post-example"><strong>Changing Rainfall Patterns:</strong> Shifts in monsoon timing and intensity disrupt planting schedules that farmers have relied on for generations. In the Philippines, irregular rainfall caused by El Niño and La Niña cycles is already reducing rice and corn production.</div>
        <div class="post-example"><strong>Saltwater Intrusion:</strong> Rising sea levels and storm surges drive salt water into coastal agricultural lands, rendering them unproductive. Rice paddies in low-lying coastal areas of Luzon and Mindanao are increasingly affected.</div>
        <div class="post-example"><strong>Fisheries Collapse:</strong> Ocean warming and acidification are degrading coral reefs and marine ecosystems that support fisheries. For the Philippines — where fish provides 60% of animal protein for the population — this is a severe food security threat.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines is heavily dependent on rice agriculture, with over 10 million farmers and agricultural workers. The country has experienced repeated El Niño-induced droughts that have cut rice production by 10–20% in affected years. PhilRice and IRRI (International Rice Research Institute, based in Los Baños, Laguna) are developing heat-tolerant and drought-resistant rice varieties to address these threats.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Climate change threatens global food security through heat stress on crops, disrupted rainfall, saltwater intrusion, fisheries collapse, and expanded agricultural pests. For the Philippines, rice production and fisheries are both under significant climate stress, requiring both adaptation and mitigation strategies.
        </div>
      `
    },
    {
      id: 'climate-6',
      badge: 'CLIMATE IMPACT',
      title: 'Climate Migration and Displacement',
      subtitle: 'The Human Cost of Environmental Change',
      img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
      author: 'Christian Montes', date: 'March 2026', read: '8 min read',
      tags: ['#Migration', '#Displacement', '#Refugees'],
      body: `
        <p>Climate change is already one of the primary drivers of human displacement worldwide. Rising seas, intensifying storms, prolonged droughts, desertification, and the collapse of agricultural systems are forcing millions of people to abandon their homes — often with little warning and fewer resources. The Internal Displacement Monitoring Centre (IDMC) reported that weather-related disasters displaced over 20 million people in 2022 alone. By 2050, the World Bank estimates that over 200 million people could be climate migrants.</p>

<h3>● Types of Climate Displacement</h3>
        <div class="post-example"><strong>Sudden-Onset Displacement:</strong> Typhoons, floods, and storm surges force immediate evacuations. After Typhoon Haiyan (2013), 4 million Filipinos were displaced overnight. Many never returned to their destroyed communities.</div>
        <div class="post-example"><strong>Slow-Onset Displacement:</strong> Gradually rising sea levels, increasing saltwater intrusion, and persistent droughts erode livelihoods over years or decades, eventually making areas uninhabitable. Communities on low-lying islands and coastal barangays face this creeping displacement.</div>
        <div class="post-example"><strong>Economic Climate Migration:</strong> As agriculture becomes less viable due to changing rainfall and extreme heat, rural populations migrate to cities in search of economic alternatives — fueling urban overcrowding and informality.</div>

        <h3>● Climate Justice and Displacement</h3>
        <p>The injustice of climate displacement is stark. The people most vulnerable to climate migration — subsistence farmers, fishing communities, residents of low-lying coastal areas — typically have the smallest carbon footprints. Yet they bear the most severe consequences of emissions from industrial nations. This "loss and damage" — the irreversible harm caused by climate change that communities cannot adapt to — is now at the center of international climate negotiations.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines consistently ranks among the world's top countries for disaster-related internal displacement. The NDRRMC tracks displacement from typhoons, floods, and other climate events, which regularly affect hundreds of thousands annually. The government has implemented the Sendai Framework and its own DRRM law (RA 10121) to reduce disaster risk and support displaced communities.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Climate change is driving unprecedented human displacement — currently over 20 million per year from weather events, with projections of 200 million climate migrants by 2050. The Philippines is among the most affected nations, with mass displacement from typhoons and gradual coastal erosion disproportionately impacting the most vulnerable communities.
        </div>
      `
    },
    {
      id: 'climate-7',
      badge: 'CLIMATE IMPACT',
      title: 'Public Health and Climate Change',
      subtitle: 'How Global Warming Threatens Human Health',
      img: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&q=80',
      author: 'Prince Charles Santos', date: 'March 2026', read: '7 min read',
      tags: ['#Health', '#Disease', '#Temperature'],
      body: `
        <p>The World Health Organization (WHO) identifies climate change as one of the greatest threats to global health in the 21st century, estimating it could cause 250,000 additional deaths per year between 2030 and 2050 from malnutrition, malaria, diarrhea, and heat stress. For the Philippines, a tropical country already endemic to dengue fever, leptospirosis, and waterborne diseases, climate change amplifies existing health vulnerabilities in multiple, compounding ways.</p>

<h3>● Direct Health Impacts</h3>
        <div class="post-example"><strong>Extreme Heat:</strong> Heat waves are becoming more frequent, longer, and more intense. In the Philippines, the heat index (combining temperature and humidity) regularly exceeds 42°C during April and May. Heat stroke kills outdoor workers, the elderly, and those without air conditioning — disproportionately affecting the urban poor.</div>
        <div class="post-example"><strong>Vector-Borne Diseases:</strong> Dengue fever, malaria, and Zika virus are spread by mosquitoes whose geographic range expands as temperatures rise. Warmer, wetter conditions allow Aedes aegypti mosquitoes to breed year-round in areas where they were previously seasonal. The Philippines reports over 100,000–200,000 dengue cases annually, a figure that spikes during post-typhoon and El Niño periods.</div>
        <div class="post-example"><strong>Waterborne Diseases:</strong> Floods following typhoons contaminate drinking water sources with sewage and industrial waste, causing outbreaks of leptospirosis, cholera, and typhoid. The Philippines experiences leptospirosis outbreaks following virtually every major flooding event.</div>

        <h3>● Indirect Health Impacts</h3>
        <p>Climate change affects health through indirect pathways as well: food insecurity and malnutrition as agriculture is disrupted; mental health impacts from disaster trauma, climate anxiety, and loss of community; respiratory diseases worsened by increased wildfire smoke and air pollution; and the health burdens of displacement and overcrowded evacuation centers.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The DOH (Department of Health Philippines) has identified climate change as a major public health emergency requiring integrated health adaptation plans. The Philippine Health Adaptation Strategy recognizes dengue, leptospirosis, diarrheal diseases, and heat-related illness as priority climate-sensitive conditions requiring strengthened surveillance, early warning systems, and community health worker training.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Climate change threatens human health through extreme heat, expanding disease vectors (dengue, malaria), waterborne disease outbreaks, food insecurity, and mental health impacts. For the Philippines, climate change amplifies existing tropical disease burdens and creates new health vulnerabilities that require integrated climate-health response strategies.
        </div>
      `
    },
    {
      id: 'climate-8',
      badge: 'CLIMATE IMPACT',
      title: 'Ocean Acidification Crisis',
      subtitle: 'The Invisible Threat to Marine Ecosystems',
      img: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
      author: 'Cherlyn Lavapie', date: 'March 2026', read: '6 min read',
      tags: ['#Ocean', '#Acidification', '#Marine'],
      body: `
        <p>Ocean acidification is often called climate change's "evil twin." While global warming captures the headlines, the world's oceans are simultaneously undergoing a chemical transformation that threatens the foundation of marine life. Since the Industrial Revolution, the oceans have absorbed approximately 25–30% of the CO₂ humans have emitted. This CO₂ reacts with seawater to form carbonic acid — making the ocean measurably more acidic. Ocean pH has decreased from 8.2 to approximately 8.1 since pre-industrial times — a 30% increase in acidity on the logarithmic pH scale.</p>

<h3>● How Ocean Acidification Works</h3>
        <p>When CO₂ dissolves in seawater, it forms carbonic acid (H₂CO₃), which dissociates into bicarbonate and hydrogen ions. The increase in hydrogen ions lowers pH (increases acidity) and reduces the concentration of carbonate ions. Carbonate ions are essential building blocks for the shells and skeletons of corals, mollusks, sea urchins, some plankton, and countless other marine organisms.</p>

        <h3>● Consequences for Marine Life</h3>
        <div class="post-example"><strong>Coral Reef Dissolution:</strong> Coral reefs build their calcium carbonate skeletons from carbonate ions in seawater. As ocean acidification reduces carbonate availability and ocean warming causes bleaching, coral reefs are dying globally. Reefs support approximately 25% of all marine species while covering less than 1% of the ocean floor.</div>
        <div class="post-example"><strong>Shellfish and Pteropods:</strong> Oysters, mussels, clams, and microscopic pteropod sea snails — at the base of many food chains — struggle to build shells in more acidic waters. Shellfish hatcheries in the Pacific have already reported failures linked to ocean acidification.</div>
        <div class="post-example"><strong>Marine Food Webs:</strong> Small plankton called foraminifera and coccolithophores form the base of ocean food webs. Their decline would cascade up through fish, marine mammals, and seabirds — ultimately affecting the fisheries that billions of people depend on.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines is at the heart of the Coral Triangle — the world's most biodiverse marine region, encompassing the Philippines, Indonesia, Malaysia, Papua New Guinea, Solomon Islands, and Timor-Leste. This region supports 76% of known coral species and 37% of the world's reef fish species. Ocean acidification, combined with warming and pollution, is causing mass coral bleaching events across Philippine waters including Tubbataha Reef Natural Park, a UNESCO World Heritage Site.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Ocean acidification — caused by CO₂ absorption — is making seas 30% more acidic, dissolving coral skeletons, disrupting shellfish development, and threatening marine food webs. The Philippine Coral Triangle is one of the most vulnerable and most valuable marine regions on Earth, facing existential risk from combined acidification and warming.
        </div>
      `
    },
    {
      id: 'climate-9',
      badge: 'CLIMATE IMPACT',
      title: 'Super Typhoon Haiyan: A Philippine Tragedy',
      subtitle: 'The Devastating Impact of Climate-Driven Extreme Weather',
      img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      author: 'Zandra Gabriela Arante', date: 'March 2026', read: '8 min read',
      tags: ['#Philippines', '#Typhoon', '#Disaster'],
      body: `
        <p>On November 8, 2013, Super Typhoon Haiyan — known in the Philippines as Yolanda — made landfall near Guiuan, Eastern Samar, with maximum sustained winds of 315 km/h and gusts reaching 380 km/h. It was, at the time, the strongest tropical cyclone ever to make landfall in recorded history. The typhoon generated a catastrophic storm surge of 5–7 meters in Tacloban City, wiping entire communities from the map within minutes. The human cost was staggering: over 6,300 deaths, 4 million displaced, and 16 million people affected across 44 provinces.</p>

<h3>● The Role of Climate Change in Haiyan's Intensity</h3>
        <p>Scientists cannot attribute any single storm directly to climate change — but they can assess how climate change altered the conditions that made Haiyan possible. The western Pacific Ocean, through which Haiyan passed, had sea surface temperatures 0.5–1°C above historical averages in November 2013. Warmer ocean water provided additional energy for rapid intensification. Climate attribution studies have found that the record-breaking rainfall and intensity of Haiyan were made more likely by human-caused warming.</p>

        <h3>● Haiyan's Lessons for Climate Resilience</h3>
        <div class="post-example"><strong>Early Warning Systems Work:</strong> PAGASA's improved forecasting and the government's mass evacuation of over 700,000 people before landfall saved many lives. However, the storm's surge — widely unfamiliar to coastal populations — still killed thousands who sheltered in place.</div>
        <div class="post-example"><strong>Building Codes and Land Use:</strong> Structures built of concrete with proper design survived far better than traditional light-material houses. Tacloban's rebuilding incorporated stronger construction standards and designated "no-build zones" in high-risk storm surge areas.</div>
        <div class="post-example"><strong>Climate Justice:</strong> Typhoon Haiyan brought global attention to climate justice. At COP19 in Warsaw, days after the typhoon, Philippine climate negotiator Yeb Sano delivered an emotional plea for urgent global climate action and fasted for the duration of the negotiations — drawing worldwide media attention to climate vulnerability.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippine government's post-Haiyan "Build Back Better" program attempted to relocate survivors from high-risk coastal zones to safer inland areas. However, many survivors returned to their former barangays due to social ties, livelihood needs, and inadequate relocation sites. The experience highlights the complex human dimensions of climate adaptation and displacement.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Super Typhoon Haiyan — the strongest landfalling typhoon ever recorded — killed 6,300+ Filipinos, displaced 4 million, and caused $2.2 billion in damage in 2013. Climate change enhanced its intensity through warmer ocean temperatures, and the disaster accelerated international recognition of climate vulnerability in developing nations like the Philippines.
        </div>
      `
    }
  ],

  bio: [
    {
      id: 'bio-1',
      badge: 'BIODIVERSITY LOSS',
      title: 'Effect of Biodiversity Loss',
      subtitle: 'The Sixth Mass Extinction and What It Means for Humanity',
      img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
      author: 'Cherlyn Lavapie', date: 'March 2026', read: '7 min read',
      tags: ['#Extinction', '#Ecosystem Services', '#Conservation'],
      body: `
        <p>We are living through Earth's sixth mass extinction event, with species vanishing 1,000 to 10,000 times faster than natural background rates. The loss of biodiversity doesn't just impoverish nature — it destabilizes the ecological systems that sustain human civilization. This crisis is unfolding today, in real time, across every ecosystem on Earth.</p>

<h3>● What Is Biodiversity?</h3>
        <p>Biodiversity encompasses the variety of all living organisms — genetic diversity within species, the number of species in a region, and the full range of ecosystems. It represents 3.8 billion years of evolution. More importantly, biodiversity is the foundation of ecosystem services: clean air, fresh water, fertile soil, pollination, nutrient cycling, climate regulation, and disease control — services that sustain human civilization.</p>

        <h3>● The Sixth Mass Extinction</h3>
        <p>Earth has experienced five previous mass extinctions, each eliminating over 75% of species. The current, sixth mass extinction is unlike the others — it is caused entirely by one species: humans. The IPCC and IPBES (Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services) estimate that approximately 1 million species currently face extinction — a number unprecedented in human history.</p>

        <h3>● Major Drivers of Biodiversity Loss</h3>
        <div class="post-example"><strong>Habitat Destruction:</strong> The leading cause globally. The Philippines has lost over 93% of its original forest cover. Coral reefs, wetlands, and grasslands face similar pressures.</div>
        <div class="post-example"><strong>Climate Change:</strong> Shifting temperatures and rainfall patterns are pushing species beyond their thermal tolerance, disrupting breeding cycles, and eliminating habitats faster than species can migrate.</div>
        <div class="post-example"><strong>Overexploitation:</strong> Overfishing, illegal wildlife trade, and bushmeat hunting are decimating populations. The Philippines' rich marine resources are under severe pressure from dynamite fishing and trawling.</div>
        <div class="post-example"><strong>Pollution:</strong> Pesticides, plastic, heavy metals, and agricultural runoff contaminate ecosystems, killing non-target species and degrading water quality. Microplastics are now found in every ocean ecosystem.</div>
        <div class="post-example"><strong>Invasive Species:</strong> Non-native species outcompete native ones. In island ecosystems like the Philippines, invasives are particularly devastating to endemic species with no evolutionary defenses.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines is one of 17 megadiverse countries worldwide, containing approximately 52,000 native species — with exceptionally high endemism. However, it also has one of the world's highest deforestation rates historically. Iconic species like the Philippine Eagle (fewer than 400 breeding pairs), Tamaraw, and Palawan bearcat are critically endangered.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> The sixth mass extinction is underway, driven by habitat destruction, climate change, overexploitation, pollution, and invasive species. Biodiversity loss destabilizes the ecological systems that produce food, clean water, medicine, and climate stability — making it an existential threat to human welfare, not just a conservation concern.
        </div>
      `
    },
    {
      id: 'bio-2',
      badge: 'BIODIVERSITY LOSS',
      title: 'Habitat Destruction and Species Extinction',
      subtitle: 'How Human Development Drives Species to Extinction',
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      author: 'Edralin Ramos', date: 'March 2026', read: '7 min read',
      tags: ['#Habitat', '#Extinction', '#Conservation'],
      body: `
        <p>Habitat destruction is the single largest driver of biodiversity loss worldwide. When forests, wetlands, coral reefs, and grasslands are cleared, drained, or degraded, the species that evolved within them lose their homes — often with no alternative refuge. The global rate of habitat loss is staggering: the equivalent of a football field of tropical forest is lost every second. In the Philippines, habitat destruction has pushed the country — one of Earth's 17 megadiverse nations — to the brink of ecological crisis.</p>

<h3>● Types of Habitat Destruction</h3>
        <div class="post-example"><strong>Deforestation:</strong> Clearing forest for agriculture, logging, and urban expansion is the most widespread form. The Philippines has lost over 93% of its original old-growth forest cover — from approximately 21 million hectares in 1900 to less than 1.5 million hectares today.</div>
        <div class="post-example"><strong>Wetland Drainage:</strong> Mangrove forests — critical nurseries for fish, buffers against storm surge, and carbon stores — have been dramatically reduced in the Philippines through aquaculture conversion (fishpond development) and coastal reclamation.</div>
        <div class="post-example"><strong>Coral Reef Destruction:</strong> Dynamite fishing, cyanide fishing, and sedimentation from deforestation have destroyed vast areas of Philippine coral reefs. The Philippines has lost approximately 32–50% of its original coral reef cover.</div>
        <div class="post-example"><strong>Fragmentation:</strong> Even when forests aren't completely removed, roads, farms, and settlements fragment them into isolated patches too small to support viable populations of large species like the Philippine Eagle, which requires vast contiguous forest territory.</div>

        <h3>● Why Habitat Loss Is Irreversible</h3>
        <p>Unlike other environmental threats, habitat destruction often creates irreversible change. Cleared old-growth forest cannot be fully restored on human timescales — the complex web of soil organisms, mycorrhizal fungi, epiphytic plants, and specialized species that make primary forest function takes centuries to develop. Once species are driven locally extinct by habitat loss, they rarely return even if habitat is partially restored.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The DENR's National Greening Program (NGP) has planted millions of trees across the Philippines, but critics note that monoculture tree plantations planted under the program provide far less biodiversity value than the complex old-growth forests they replaced. Community-based forest management with indigenous peoples (IP groups) and local communities (LGUs) has shown more ecologically sound outcomes.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Habitat destruction — through deforestation, wetland drainage, reef damage, and fragmentation — is the primary driver of species extinction. The Philippines has lost most of its original forest and reef cover, putting thousands of endemic species at severe risk. Restoration is possible but takes decades and requires different approaches than simple tree planting.
        </div>
      `
    },
    {
      id: 'bio-3',
      badge: 'BIODIVERSITY LOSS',
      title: 'Pollinator Decline and Food Security',
      subtitle: 'How Bee Population Collapse Threatens Our Food Supply',
      img: 'https://images.unsplash.com/photo-1465014392158-4d72a6bde933?w=800&q=80',
      author: 'Leolah Mae Camposano', date: 'March 2026', read: '6 min read',
      tags: ['#Pollinators', '#Bees', '#Agriculture'],
      body: `
        <p>The global decline of pollinators — bees, butterflies, birds, bats, and other animals that transfer pollen between flowers — is a silent crisis with potentially catastrophic consequences for food security. Approximately 75% of the world's flowering plants and 35% of global food crop production depend on animal pollination. Without pollinators, billions of people would face food shortages and malnutrition as countless crops — from almonds and apples to cucumbers and coffee — fail to produce fruit or seeds.</p>

<h3>● The Scale of Pollinator Decline</h3>
        <p>Global bee populations have declined by 25–45% over recent decades, depending on species and region. In North America and Europe, the picture is stark: managed honeybee colonies declined by approximately 45% between 1947 and 2008. Wild bumblebee populations have declined even more dramatically, with some species disappearing from large portions of their former ranges. Asian and tropical bee species — many of which serve as primary pollinators in the Philippines and Southeast Asia — remain less well-studied, but habitat loss and pesticide use are taking their toll.</p>

        <h3>● What's Causing Pollinator Decline?</h3>
        <div class="post-example"><strong>Habitat Loss:</strong> Conversion of wildflower meadows, forests, and hedgerows to monoculture agriculture eliminates the diverse plant communities that pollinators need for year-round food and nesting.</div>
        <div class="post-example"><strong>Pesticides (Neonicotinoids):</strong> Systemic insecticides called neonicotinoids, which persist in pollen and nectar, have been shown to impair bee navigation, memory, reproduction, and immune function — even at sub-lethal doses.</div>
        <div class="post-example"><strong>Parasites and Diseases:</strong> The Varroa mite is a devastating parasite of honeybee colonies. Combined with viral pathogens, Varroa infestations are responsible for Colony Collapse Disorder (CCD) affecting beekeepers worldwide.</div>
        <div class="post-example"><strong>Climate Change:</strong> Warming temperatures disrupt the synchrony between flowering plants and their pollinators — bees may emerge weeks before or after the flowers they depend on, causing "phenological mismatches" that reduce foraging success and reproduction.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines has several native bee species, including the world's largest bee — Wallace's giant bee (Megachile pluto), rediscovered in North Maluku in 2019. Philippine pollinators face pressure from habitat loss, excessive pesticide use in rice and vegetable farming, and the introduction of the invasive small hive beetle. Protecting native bees is essential for Philippine agriculture and forest regeneration.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Pollinators — especially bees — are essential for 75% of global food crops. Populations are declining worldwide due to habitat loss, pesticide use, parasites, and climate change. A world without sufficient pollinators would face severe food shortages, economic collapse of agricultural sectors, and the destabilization of ecosystems dependent on flowering plants.
        </div>
      `
    },
    {
      id: 'bio-4',
      badge: 'BIODIVERSITY LOSS',
      title: 'The Pharmaceutical Value of Biodiversity',
      subtitle: 'Why Species Conservation Is Medical Progress',
      img: 'https://images.unsplash.com/photo-1584308666744-24d5f15714ae?w=800&q=80',
      author: 'Arthur Jake Rosario', date: 'March 2026', read: '7 min read',
      tags: ['#Medicine', '#Drugs', '#Nature'],
      body: `
        <p>Every species that goes extinct takes with it millions of years of evolutionary experimentation — including potentially irreplaceable chemical compounds that nature has refined over geological time. Over 50% of modern pharmaceuticals are derived from, or inspired by, natural organisms: aspirin from willow bark, penicillin from fungi, quinine from cinchona tree bark, morphine from poppies, and taxol (a cancer treatment) from the Pacific yew tree. As biodiversity collapses, we are destroying an irreplaceable natural pharmacy before we've even catalogued it.</p>

<h3>● Nature's Pharmaceutical Legacy</h3>
        <div class="post-example"><strong>Antibiotics:</strong> Penicillin, streptomycin, tetracycline, and countless other life-saving antibiotics were discovered from naturally occurring soil bacteria and fungi. The antibiotic era — which has saved hundreds of millions of lives — began with a chance observation of a mold (Penicillium notatum) by Alexander Fleming in 1928.</div>
        <div class="post-example"><strong>Cancer Treatments:</strong> Taxol (paclitaxel), derived from the Pacific yew tree, is one of the most widely used cancer chemotherapy drugs. Vinblastine and vincristine, derived from the Madagascar periwinkle plant, treat leukemia and lymphoma. These discoveries came from species that could easily have been logged or cleared before their medical value was discovered.</div>
        <div class="post-example"><strong>Cardiovascular Drugs:</strong> Digoxin, used to treat heart failure, comes from the foxglove plant (Digitalis). Captopril, a widely used blood pressure medication, was developed by studying the venom of the Brazilian lancehead viper.</div>
        <div class="post-example"><strong>Marine Pharmaceuticals:</strong> Ocean organisms have yielded cytarabine (from a Caribbean sea sponge, used for leukemia), trabectedin (from a sea squirt, used for sarcoma), and countless compounds under investigation. Coral reef species are particularly promising sources of novel bioactive compounds.</div>

        <h3>● What We're Losing</h3>
        <p>Scientists estimate there are 8–10 million species on Earth, but only about 1.8 million have been formally described. Tropical forests and coral reefs — the most biodiverse ecosystems — contain the highest densities of unstudied species. The Philippines' approximately 52,000 species, many found nowhere else, represent an enormous but largely unexplored source of potential medicines. Each extinction permanently destroys chemical compounds and genetic information that cannot be reconstructed.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines' biodiversity — particularly its marine organisms from the Coral Triangle and its endemic forest plants — represents significant but largely unexplored pharmaceutical potential. The Philippine Institute of Traditional and Alternative Health Care (PITAHC) has documented hundreds of traditional medicinal plants, many of which contain bioactive compounds yet to be fully studied. Organizations like PCAARRD support bioprospecting research under the Wildlife Resources Conservation and Protection Act (RA 9147).</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Over 50% of modern pharmaceuticals come from nature. As biodiversity collapses, we permanently lose unstudied species that may hold cures for cancer, antibiotic-resistant infections, neurological diseases, and conditions we have yet to face. The Philippines' rich biodiversity represents an irreplaceable pharmaceutical heritage that demands urgent conservation.
        </div>
      `
    },
    {
      id: 'bio-5',
      badge: 'BIODIVERSITY LOSS',
      title: 'Ocean Biodiversity Under Threat',
      subtitle: 'The Crisis in Marine Ecosystems and Fisheries',
      img: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80',
      author: 'Caleb Nicholas Cofuentes', date: 'March 2026', read: '7 min read',
      tags: ['#Marine', '#Fish', '#Ocean'],
      body: `
        <p>The world's oceans cover over 70% of Earth's surface and contain the greatest diversity of life on the planet — from microscopic plankton to the blue whale, from hydrothermal vent communities to shallow coral reefs. Yet marine biodiversity is under unprecedented threat from overfishing, plastic pollution, ocean warming, acidification, and habitat destruction. The Philippines, surrounded by the Coral Triangle — the world's most biodiverse marine region — faces both the greatest marine biodiversity and some of its most severe threats.</p>

<h3>● Overfishing: Taking Too Much, Too Fast</h3>
        <p>Approximately 34% of the world's marine fish stocks are now overfished — depleted beyond sustainable levels. Global fishing fleets have expanded far beyond what ocean productivity can support. Industrial-scale trawling destroys seafloor habitats, catches massive quantities of non-target species (bycatch), and disrupts food webs. In the Philippines, decades of overfishing and destructive practices (dynamite fishing, muro-ami) have severely depleted inshore fish stocks that coastal communities depend on for food and income.</p>

        <h3>● Plastic Pollution in Philippine Waters</h3>
        <p>The Philippines is among the world's top sources of ocean plastic pollution — a consequence of inadequate waste management infrastructure, high plastic packaging use, and large coastal population. An estimated 2.7 million metric tons of mismanaged plastic waste is generated in the Philippines annually. Marine plastic kills sea turtles, seabirds, dolphins, and fish through entanglement and ingestion. Microplastics contaminate the entire marine food chain — from plankton to the fish that Filipinos eat daily.</p>

        <h3>● The Coral Triangle's Crisis</h3>
        <p>The Coral Triangle encompasses Philippine, Indonesian, Malaysian, and Pacific waters and is home to 600+ coral species, 2,000+ reef fish species, 6 of the world's 7 marine turtle species, and critical feeding grounds for migrating whales and whale sharks. It is now severely threatened by coral bleaching (from ocean warming), acidification, destructive fishing practices, and sedimentation from deforestation. Studies estimate that 85% of coral reefs in the Coral Triangle are now threatened.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>BFAR (Bureau of Fisheries and Aquatic Resources) manages over 2 million small-scale fisherfolk who depend on inshore fisheries for their livelihoods. As fish stocks decline from overfishing, climate impacts, and pollution, these communities face food insecurity and economic collapse. Marine protected areas (MPAs) like Tubbataha Reef, Apo Island, and Danajon Bank are proving effective but cover only a fraction of Philippine waters.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Marine biodiversity faces simultaneous threats from overfishing, plastic pollution, ocean warming, acidification, and habitat destruction. The Philippines' Coral Triangle — the world's most biodiverse marine ecosystem — is under severe pressure, threatening both ecological stability and the food security of millions of fisherfolk who depend on healthy seas.
        </div>
      `
    },
    {
      id: 'bio-6',
      badge: 'BIODIVERSITY LOSS',
      title: 'Invasive Species and Ecosystem Damage',
      subtitle: 'How Non-Native Species Disrupt Ecosystems',
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      author: 'Christian Montes', date: 'March 2026', read: '6 min read',
      tags: ['#Invasive', '#Ecosystem', '#Species'],
      body: `
        <p>Invasive alien species are the second-largest driver of species extinctions globally, after habitat destruction. When non-native species are introduced to new environments — whether deliberately (as ornamental plants, biocontrol agents, or livestock) or accidentally (as stowaways in ship ballast water or on cargo) — they can multiply explosively in the absence of natural predators, competitors, or disease. The resulting ecological disruption can be rapid, devastating, and very difficult to reverse.</p>

<h3>● Why Island Nations Are Most Vulnerable</h3>
        <p>Island ecosystems like the Philippines are particularly vulnerable to invasive species. Species that evolve on islands are often endemic — found nowhere else on Earth — and have co-evolved without exposure to mainland predators, competitors, or pathogens. When mainland species are introduced, island natives have no behavioral or evolutionary defenses. This is why islands account for approximately 80% of recorded bird and mammal extinctions over the past 500 years.</p>

        <h3>● Major Invasive Species in the Philippines</h3>
        <div class="post-example"><strong>Golden Apple Snail (Pomacea canaliculata):</strong> Introduced in the 1980s as a protein source and ornamental species, it escaped into rice paddies and became one of the Philippines' most destructive agricultural pests. It destroys young rice plants and costs farmers billions annually. It is now considered one of the world's 100 worst invasive species by IUCN.</div>
        <div class="post-example"><strong>Janitor Fish (Pterygoplichthys spp.):</strong> Introduced through the aquarium trade, janitor fish have spread throughout Philippine river systems. They displace native fish, consume fish eggs, and damage river banks, seriously disrupting freshwater ecosystems.</div>
        <div class="post-example"><strong>Tilapia:</strong> While now a valuable food fish, tilapia (introduced from Africa) has displaced native freshwater fish species in many Philippine lakes and rivers, reducing aquatic biodiversity.</div>
        <div class="post-example"><strong>Invasive Plants:</strong> Water hyacinth, cogon grass (Imperata cylindrica), and giant sensitive plant (Mimosa diplotricha) choke waterways, outcompete native vegetation, and alter fire regimes in grasslands and forest edges.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines' Wildlife Resources Conservation and Protection Act (RA 9147) and the National Invasive Species Strategy and Action Plan (NISSAP) provide legal frameworks for managing invasive species. PAWB–DENR maintains a national database of invasive alien species and coordinates with LGUs and farmers for control measures.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Invasive alien species are a leading driver of biodiversity loss, especially on islands. In the Philippines, species like the golden apple snail and janitor fish have caused major ecological and agricultural damage. Island nations are particularly vulnerable because endemic species evolved without defenses against mainland competitors and predators.
        </div>
      `
    },
    {
      id: 'bio-7',
      badge: 'BIODIVERSITY LOSS',
      title: 'Philippine Endemic Species at Risk',
      subtitle: 'Unique Wildlife Found Nowhere Else on Earth',
      img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      author: 'Rhobbie Roxas', date: 'March 2026', read: '7 min read',
      tags: ['#Philippines', '#Endemic', '#Wildlife'],
      body: `
        <p>The Philippines is recognized as one of the world's 17 megadiverse countries — nations that collectively contain more than 70% of Earth's plant and animal species despite occupying less than 10% of its land area. What makes the Philippines particularly extraordinary is its exceptionally high rate of endemism: approximately 50–60% of its species exist nowhere else on Earth. Yet this irreplaceable natural heritage is under severe threat from deforestation, habitat conversion, wildlife trade, and climate change.</p>

<h3>● The Philippines' Extraordinary Biodiversity</h3>
        <p>The Philippines harbors approximately 52,177 known species of plants and animals, including 3,214 endemic plant species, 170 species of land birds (90% endemic), 111 species of land mammals (60% endemic), and 293 species of amphibians (85% endemic). This biological richness evolved over millions of years as the Philippine archipelago was repeatedly connected to and isolated from mainland Asia, creating unique evolutionary lineages.</p>

        <h3>● Critically Endangered Philippine Species</h3>
        <div class="post-example"><strong>Philippine Eagle (Pithecophaga jefferyi):</strong> The world's largest eagle by wing surface area. Fewer than 400 breeding pairs remain, confined to primary forest in Mindanao, Leyte, Samar, and a few areas of Luzon. It requires vast, undisturbed forest territory — at least 4,000–7,000 hectares per pair — making it exquisitely vulnerable to deforestation.</div>
        <div class="post-example"><strong>Tamaraw (Bubalus mindorensis):</strong> A small, critically endangered water buffalo found only on Mindoro Island. Population has declined from thousands to fewer than 480 individuals due to hunting, habitat loss, and disease from domestic cattle. Classified as Critically Endangered by IUCN.</div>
        <div class="post-example"><strong>Irrawaddy Dolphin (Orcaella brevirostris):</strong> Critically endangered population in Malampaya Sound, Palawan — estimated at fewer than 77 individuals. Threatened by fishing bycatch, boat traffic, and habitat degradation.</div>
        <div class="post-example"><strong>Philippine Crocodile (Crocodylus mindorensis):</strong> One of the world's rarest crocodilians, found only in the Philippines. Fewer than 250 individuals remain in the wild, threatened by hunting, habitat loss, and persecution. Critical to river ecosystem health.</div>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The DENR–BMB manages 94 protected areas covering approximately 5.4 million hectares under the NIPAS (National Integrated Protected Areas System) Act. The Philippine Eagle Center in Davao, the Tamaraw Conservation Program in Mindoro, and community-based wildlife sanctuaries represent grassroots efforts to save endemic species. International partnerships with WWF, WCS, and IUCN support these programs.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> The Philippines' exceptional endemism — with 50–60% of species found nowhere else on Earth — makes biodiversity loss here a global irreplaceable tragedy. Critically endangered species like the Philippine Eagle, Tamaraw, and Philippine Crocodile face extinction within decades without strengthened protection, habitat restoration, and community engagement.
        </div>
      `
    },
    {
      id: 'bio-8',
      badge: 'BIODIVERSITY LOSS',
      title: 'Ecosystem Services and Human Survival',
      subtitle: 'The Free Services Nature Provides That We Take for Granted',
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      author: 'Jonalyn Tablizo', date: 'March 2026', read: '7 min read',
      tags: ['#Ecosystem', '#Services', '#Nature'],
      body: `
        <p>Nature provides humanity with a vast array of services that are essential for human survival and economic prosperity — but rarely appear in national accounts or corporate balance sheets because they are free. These "ecosystem services" include the production of clean air and water, the stabilization of soils, the pollination of crops, the regulation of climate, the decomposition of waste, and the provision of food and medicine. The total economic value of ecosystem services has been estimated at $125–145 trillion annually — nearly twice the global GDP. As biodiversity collapses, these services degrade or disappear.</p>

<h3>● The Four Categories of Ecosystem Services</h3>
        <div class="post-example"><strong>Provisioning Services:</strong> Food (fish, wild plants, bushmeat), fresh water, fiber, timber, medicinal plants, and genetic resources. The Philippines' biodiversity provides direct provisioning services to millions of fisherfolk, farmers, and indigenous communities.</div>
        <div class="post-example"><strong>Regulating Services:</strong> Climate regulation (carbon sequestration in forests and soils), flood control (wetlands and mangroves absorb storm water), water purification (wetlands filter pollutants), disease regulation (diverse ecosystems reduce disease transmission), and pollination.</div>
        <div class="post-example"><strong>Cultural Services:</strong> Recreation and ecotourism, spiritual and religious values, aesthetic appreciation, educational value, and the cultural identities of indigenous communities tied to specific landscapes and species.</div>
        <div class="post-example"><strong>Supporting Services:</strong> Nutrient cycling (nitrogen and phosphorus fixation), soil formation (dependent on complex soil biodiversity), primary production (photosynthesis by plants forming the base of all food webs), and water cycling.</div>

        <h3>● When Ecosystem Services Fail: Real-World Consequences</h3>
        <p>When ecosystem services are disrupted, the consequences are immediate and often catastrophic. Deforestation in steep Philippine watersheds eliminates the flood regulation service of forest soil — contributing directly to the deadly landslides and flash floods that kill hundreds of Filipinos during typhoons. Degradation of coral reefs eliminates the fish production and coastal protection services that 2 million Philippine fisherfolk depend on. Wetland drainage eliminates natural flood storage, worsening inundation in cities like Manila.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines' Department of Environment and Natural Resources has begun implementing Payments for Ecosystem Services (PES) schemes under the National Greening Program, recognizing that local governments and water utilities that benefit from watershed protection services should compensate upland communities for maintaining forest cover. Laguna Lake's water supply services, mangrove coastal protection, and watershed services of the Sierra Madre are among the priority PES programs.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Biodiversity underpins ecosystem services worth $125–145 trillion annually — clean water, food, climate regulation, flood control, disease regulation, and pollination. As species and habitats are lost, these services degrade, with direct consequences for human food security, health, economic stability, and disaster vulnerability.
        </div>
      `
    },
    {
      id: 'bio-9',
      badge: 'BIODIVERSITY LOSS',
      title: 'Conservation Strategies and Hope',
      subtitle: 'How We Can Reverse Biodiversity Loss',
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      author: 'Prince Charles Santos', date: 'March 2026', read: '8 min read',
      tags: ['#Conservation', '#Solutions', '#Hope'],
      body: `
        <p>Despite the scale and severity of the biodiversity crisis, there is genuine cause for hope. Decades of conservation science, legal frameworks, community-based management, and international cooperation have demonstrated that species can recover, ecosystems can be restored, and human communities can build sustainable livelihoods that work with — rather than against — nature. The key question is whether humanity will scale up these proven solutions fast enough to prevent irreversible losses.</p>

<h3>● Proven Conservation Strategies</h3>
        <div class="post-example"><strong>Protected Areas:</strong> Marine protected areas (MPAs) and terrestrial reserves remain the cornerstone of biodiversity conservation. Apo Island in Negros Oriental — a community-managed MPA since 1985 — has become a global model for reef recovery. Fish biomass inside the protected area increased 13-fold compared to unprotected areas nearby.</div>
        <div class="post-example"><strong>Species Recovery Programs:</strong> Focused, science-based programs for critically endangered species — like the Philippine Eagle Conservation Program in Davao, the Tamaraw Conservation Program in Mindoro, and the Philippine Crocodile breeding program in Palawan — have stabilized or partially recovered populations that were on the verge of extinction.</div>
        <div class="post-example"><strong>Community-Based Natural Resource Management (CBNRM):</strong> Giving local communities — including indigenous peoples — rights and responsibility over their natural resources has proven more sustainable than top-down government management. The Tagbanua of Palawan's community-based turtle conservation is a successful example.</div>
        <div class="post-example"><strong>Habitat Restoration:</strong> Reforestation with native species, wetland restoration, and coral reef rehabilitation can recover ecological function even in highly degraded areas, if done with biodiversity goals — not just carbon targets — in mind.</div>

        <h3>● The Kunming-Montreal Global Biodiversity Framework</h3>
        <p>At COP15 in December 2022, 196 nations adopted the Kunming-Montreal Global Biodiversity Framework — a landmark agreement committing the world to protecting 30% of Earth's land and oceans by 2030 (the "30x30" target), restoring 30% of degraded ecosystems, reducing subsidies harmful to biodiversity, and mobilizing $200 billion annually for biodiversity finance. This represents the most ambitious global biodiversity commitment in history.</p>

        <div class="post-example">
          <span class="example-tag">🇵🇭 Philippine Context</span>
          <p>The Philippines' NIPAS (National Integrated Protected Areas System) currently covers approximately 5.4 million hectares — about 18% of the country's total land area and some marine areas. The DENR–BMB is expanding the protected areas network and strengthening enforcement. Community-level initiatives — from bantay-dagat (sea watchers) programs to CBFM agreements — engage millions of Filipinos directly in biodiversity conservation.</p>
        </div>

        <div class="post-summary">
          <strong>Quick Summary:</strong> Conservation works — species recover, reefs rebound, and forests regrow when given the chance and the support. Success requires protected areas, community engagement, species recovery programs, habitat restoration, and international cooperation. The 2022 Kunming-Montreal Framework commits the world to protecting 30% of land and ocean by 2030 — but implementation must move from political pledges to action on the ground.
        </div>
      `
    }
  ]
};

/* ============================================================
   ASSESSMENT DATA (unique type per topic)
   ============================================================ */
const ASSESSMENTS = {
  warming: {
    type: 'quiz',
    icon: '🧠',
    title: 'Quick Knowledge Quiz',
    subtitle: 'Test what you\'ve learned about Global Warming',
    questions: [
      {
        q: 'What is the current atmospheric CO₂ concentration, a level not seen in 800,000 years?',
        opts: ['280 ppm', '350 ppm', '420 ppm', '500 ppm'],
        ans: 2,
        explain: 'CO₂ has surpassed 420 parts per million — a direct result of fossil fuel burning since the Industrial Revolution.'
      },
      {
        q: 'Which activity is the SINGLE LARGEST cause of global warming?',
        opts: ['Deforestation', 'Burning fossil fuels', 'Agriculture', 'Landfills'],
        ans: 1,
        explain: 'Burning coal, oil, and natural gas for energy, transportation, and industry releases over 36 billion metric tons of CO₂ annually.'
      },
      {
        q: 'Methane is how many times more potent than CO₂ over a 100-year period?',
        opts: ['5 times', '10 times', '28–36 times', '100 times'],
        ans: 2,
        explain: 'Methane is 28–36× more potent than CO₂, making livestock farming and landfills critical targets for emission reduction.'
      },
      {
        q: 'The Philippines committed to reduce emissions by how much by 2030?',
        opts: ['25%', '50%', '75%', '90%'],
        ans: 2,
        explain: 'The Philippines pledged a 75% emissions reduction by 2030, conditional on international financial and technological support.'
      },
      {
        q: 'What natural system acts as Earth\'s most important carbon sink besides oceans?',
        opts: ['Deserts', 'Forests', 'Grasslands', 'Mountains'],
        ans: 1,
        explain: 'Forests absorb billions of tons of CO₂ each year. Deforestation removes this vital sink and releases stored carbon.'
      }
    ]
  },

  climate: {
    type: 'multiple_choice',
    icon: '🌊',
    title: 'True or False? Climate Challenge',
    subtitle: 'Decide if each statement about Climate Impact is TRUE or FALSE',
    questions: [
      {
        q: 'The Philippines experiences an average of 20 typhoons per year — more than any other country.',
        opts: ['TRUE ✓', 'FALSE ✗'],
        ans: 0,
        explain: 'TRUE — The Philippines sits in the Pacific typhoon belt and faces about 20 tropical cyclones annually, a number set to intensify with climate change.'
      },
      {
        q: 'Ocean acidification has decreased by 30% since pre-industrial times due to marine plants absorbing CO₂.',
        opts: ['TRUE ✓', 'FALSE ✗'],
        ans: 1,
        explain: 'FALSE — Oceans have become about 30% MORE ACIDIC since pre-industrial times as they absorb excess atmospheric CO₂, threatening marine life.'
      },
      {
        q: 'Super Typhoon Haiyan (Yolanda) had winds exceeding 315 km/h — making it one of the strongest ever recorded.',
        opts: ['TRUE ✓', 'FALSE ✗'],
        ans: 0,
        explain: 'TRUE — Haiyan made landfall on November 8, 2013 with 315 km/h winds, killing over 6,000 Filipinos and displacing 4 million people.'
      },
      {
        q: 'The IPCC says we can exceed 2.5°C of warming without severe consequences for ecosystems.',
        opts: ['TRUE ✓', 'FALSE ✗'],
        ans: 1,
        explain: 'FALSE — The IPCC warns that exceeding 1.5°C will cause severe and widespread consequences. We are already at approximately 1.1°C and rising.'
      },
      {
        q: 'Climate change increases the geographic range of dengue-carrying mosquitoes, affecting more people globally.',
        opts: ['TRUE ✓', 'FALSE ✗'],
        ans: 0,
        explain: 'TRUE — Warmer temperatures and erratic rainfall patterns expand the habitat range of Aedes aegypti mosquitoes, increasing dengue fever risk worldwide.'
      }
    ]
  },

  bio: {
    type: 'species_rescue',
    icon: '🦅',
    title: 'Species Rescue Mission!',
    subtitle: 'Match each endangered Philippine species to its biggest threat. Save them all before time runs out!'
  }
};

/* ============================================================
   RENDER ASSESSMENT
   ============================================================ */
function renderAssessment(topicKey) {
  const section = document.getElementById('assessment-section');
  const assess  = ASSESSMENTS[topicKey];
  if (!assess || !section) return;

  if (assess.type === 'quiz' || assess.type === 'multiple_choice') {
    renderQuiz(section, assess);
  } else if (assess.type === 'activity') {
    renderFlipActivity(section, assess);
  } else if (assess.type === 'species_rescue') {
    renderSpeciesRescue(section, assess);
  }
}

/* ── Quiz / True-False renderer ───────────────────────────── */
function renderQuiz(container, assess) {
  let current = 0, score = 0, answered = false;
  const qs = assess.questions;

  function buildHTML() {
    container.innerHTML = `
      <div class="assessment-header">
        <span class="assess-icon">${assess.icon}</span>
        <h3>● ${assess.title}</h3>
        <p>${assess.subtitle}</p>
      </div>
      <div class="quiz-card" id="quiz-card">
        <div id="quiz-content"></div>
      </div>`;
    renderQuestion();
  }

  function renderQuestion() {
    const card = document.getElementById('quiz-content');
    const q = qs[current];
    const pct = ((current) / qs.length * 100).toFixed(0);

    card.innerHTML = `
      <div class="quiz-progress">
        <span class="quiz-progress-label">Question ${current + 1} of ${qs.length}</span>
        <div class="quiz-progress-bar-wrap">
          <div class="quiz-progress-bar" style="width:${pct}%"></div>
        </div>
        <span class="quiz-score-badge">Score: ${score}/${qs.length}</span>
      </div>
      <p class="quiz-question">${q.q}</p>
      <div class="quiz-options">
        ${q.opts.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback"></div>
      <div class="quiz-nav">
        <span></span>
        <button class="quiz-btn" id="quiz-next" disabled>Next Question →</button>
      </div>`;

    answered = false;

    card.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.idx);
        const correct = q.ans;
        const fb = document.getElementById('quiz-feedback');

        card.querySelectorAll('.quiz-option').forEach(b => b.classList.add('disabled'));
        btn.classList.add(chosen === correct ? 'correct' : 'wrong');
        if (chosen !== correct) {
          card.querySelectorAll('.quiz-option')[correct].classList.add('correct');
        }

        if (chosen === correct) {
          score++;
          fb.className = 'quiz-feedback show correct-fb';
          fb.textContent = '✅ Correct! ' + q.explain;
        } else {
          fb.className = 'quiz-feedback show wrong-fb';
          fb.textContent = '❌ Not quite. ' + q.explain;
        }

        document.getElementById('quiz-next').disabled = false;
      });
    });

    document.getElementById('quiz-next').addEventListener('click', () => {
      current++;
      if (current < qs.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    });
  }

  function renderResult() {
    const card = document.getElementById('quiz-content');
    const pct = Math.round(score / qs.length * 100);
    let emoji = '😐', msg = 'Keep studying!';
    if (pct >= 80) { emoji = '🏆'; msg = 'Excellent! You\'re an eco-champion!'; }
    else if (pct >= 60) { emoji = '🌱'; msg = 'Good effort! Review the topics and try again.'; }

    card.innerHTML = `
      <div class="quiz-result">
        <span class="result-emoji">${emoji}</span>
        <h4>${msg}</h4>
        <p>You scored <strong>${score} out of ${qs.length}</strong> (${pct}%).</p>
        <button class="quiz-restart" id="quiz-restart">Try Again 🔄</button>
      </div>`;
    document.getElementById('quiz-restart').addEventListener('click', () => {
      current = 0; score = 0; renderQuestion();
    });
  }

  buildHTML();
}

/* ── Flip Card Activity renderer ─────────────────────────── */
function renderFlipActivity(container, assess) {
  // kept for compatibility
}

/* ── Species Rescue Game ─────────────────────────────────── */
function renderSpeciesRescue(container, assess) {
  const SPECIES = [
    {
      emoji: '🦅', name: 'Philippine Eagle',
      fact: 'Fewer than 800 individuals remain in the wild.',
      threat: 'Deforestation',
      wrong: ['Overfishing', 'Ocean Acidification', 'Air Pollution'],
      action: '🌳 Protect old-growth forests in Mindanao!'
    },
    {
      emoji: '🐂', name: 'Tamaraw',
      fact: 'Only ~480 left — found only on Mindoro Island.',
      threat: 'Habitat Loss',
      wrong: ['Ocean Warming', 'Invasive Seaweed', 'Acid Rain'],
      action: '🏞️ Expand Mounts Iglit-Baco Natural Park!'
    },
    {
      emoji: '🐊', name: 'Philippine Crocodile',
      fact: 'Fewer than 250 remain — one of the rarest crocs on Earth.',
      threat: 'Hunting & Persecution',
      wrong: ['Overfishing', 'Drought', 'Soil Erosion'],
      action: '📢 Educate communities — crocs protect rivers!'
    },
    {
      emoji: '🐬', name: 'Irrawaddy Dolphin',
      fact: 'Fewer than 77 survive in Malampaya Sound, Palawan.',
      threat: 'Fishing Bycatch',
      wrong: ['Deforestation', 'Urban Heat', 'Wildfire'],
      action: '🎣 Switch to dolphin-safe fishing methods!'
    },
    {
      emoji: '🪸', name: 'Coral Triangle Reefs',
      fact: 'Home to 76% of known coral species worldwide.',
      threat: 'Ocean Warming & Bleaching',
      wrong: ['Deforestation', 'Air Pollution', 'Hunting'],
      action: '🌡️ Reduce carbon emissions globally!'
    },
    {
      emoji: '🐢', name: 'Philippine Sea Turtle',
      fact: '5 of 7 sea turtle species nest in Philippine waters.',
      threat: 'Plastic Pollution',
      wrong: ['Wildfires', 'Soil Acidification', 'Urban Sprawl'],
      action: '🚯 Ban single-use plastics on coastlines!'
    }
  ];

  let current = 0, score = 0, lives = 3, answered = false;
  const total = SPECIES.length;

  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
  function getLives() {
    return '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
  }

  function buildShell() {
    container.innerHTML =
      '<div class="assessment-header">' +
        '<span class="assess-icon">' + assess.icon + '</span>' +
        '<h3>● ' + assess.title + '</h3>' +
        '<p>' + assess.subtitle + '</p>' +
      '</div>' +
      '<div class="srgame-wrap" id="srgame-wrap">' +
        '<div class="srgame-hud">' +
          '<div class="srgame-lives" id="srgame-lives">' + getLives() + '</div>' +
          '<div class="srgame-progress" id="srgame-progress">Species 1 / ' + total + '</div>' +
          '<div class="srgame-score" id="srgame-score">🏆 0</div>' +
        '</div>' +
        '<div id="srgame-body"></div>' +
      '</div>';
    renderRound();
  }

  function renderRound() {
    const sp = SPECIES[current];
    const opts = shuffle([sp.threat, ...sp.wrong.slice(0, 3)]);
    const gameBody = document.getElementById('srgame-body');
    answered = false;

    document.getElementById('srgame-lives').textContent = getLives();
    document.getElementById('srgame-progress').textContent = 'Species ' + (current + 1) + ' / ' + total;
    document.getElementById('srgame-score').textContent = '🏆 ' + score;

    let optsHTML = '';
    opts.forEach(function(o) {
      optsHTML += '<button class="srgame-opt" data-val="' + o + '">' + o + '</button>';
    });

    gameBody.innerHTML =
      '<div class="srgame-card">' +
        '<div class="srgame-species-display">' +
          '<div class="srgame-emoji">' + sp.emoji + '</div>' +
          '<div class="srgame-species-name">' + sp.name + '</div>' +
          '<div class="srgame-species-fact">"' + sp.fact + '"</div>' +
        '</div>' +
        '<div class="srgame-question">⚠️ What is the BIGGEST threat to this species?</div>' +
        '<div class="srgame-options" id="srgame-options">' + optsHTML + '</div>' +
        '<div class="srgame-feedback" id="srgame-feedback"></div>' +
      '</div>';

    document.querySelectorAll('.srgame-opt').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var chosen = btn.dataset.val;
        var fb = document.getElementById('srgame-feedback');
        document.querySelectorAll('.srgame-opt').forEach(function(b) { b.disabled = true; });

        if (chosen === sp.threat) {
          score++;
          btn.classList.add('srgame-correct');
          fb.innerHTML = '<div class="srgame-fb-win">✅ Correct! <span>' + sp.action + '</span></div>';
          document.getElementById('srgame-score').textContent = '🏆 ' + score;
        } else {
          lives--;
          btn.classList.add('srgame-wrong');
          document.querySelectorAll('.srgame-opt').forEach(function(b) {
            if (b.dataset.val === sp.threat) b.classList.add('srgame-correct');
          });
          fb.innerHTML = '<div class="srgame-fb-lose">❌ Not quite! The main threat is <strong>' + sp.threat + '</strong>. ' + sp.action + '</div>';
          document.getElementById('srgame-lives').textContent = getLives();
        }

        setTimeout(function() {
          current++;
          if (lives <= 0) {
            renderGameOver();
          } else if (current >= total) {
            renderVictory();
          } else {
            renderRound();
          }
        }, 1900);
      });
    });
  }

  function renderVictory() {
    var pct = Math.round(score / total * 100);
    var badge = '🌱', msg = 'Good start, eco-warrior!';
    if (pct === 100) { badge = '🏆'; msg = 'PERFECT SCORE! You saved every species!'; }
    else if (pct >= 67) { badge = '🦅'; msg = 'Great job! The wildlife thanks you!'; }

    var speciesRow = '';
    SPECIES.forEach(function(s) { speciesRow += '<span title="' + s.name + '">' + s.emoji + '</span>'; });

    document.getElementById('srgame-body').innerHTML =
      '<div class="srgame-result">' +
        '<div class="srgame-result-emoji">' + badge + '</div>' +
        '<h4>' + msg + '</h4>' +
        '<p>You correctly identified <strong>' + score + ' out of ' + total + '</strong> threats!</p>' +
        '<div class="srgame-species-row">' + speciesRow + '</div>' +
        '<p class="srgame-cta">Every correct answer = awareness raised. Share what you learned! 🌍</p>' +
        '<button class="srgame-restart" id="srgame-restart">🔄 Play Again</button>' +
      '</div>';
    document.getElementById('srgame-restart').addEventListener('click', function() {
      current = 0; score = 0; lives = 3; buildShell();
    });
  }

  function renderGameOver() {
    document.getElementById('srgame-body').innerHTML =
      '<div class="srgame-result srgame-gameover">' +
        '<div class="srgame-result-emoji">💔</div>' +
        '<h4>Oh no! You ran out of lives...</h4>' +
        '<p>You saved <strong>' + score + ' out of ' + total + '</strong> species this round.</p>' +
        '<p class="srgame-cta">The wildlife needs you! Study the threats and try again. 🌿</p>' +
        '<button class="srgame-restart" id="srgame-restart">🔄 Try Again</button>' +
      '</div>';
    document.getElementById('srgame-restart').addEventListener('click', function() {
      current = 0; score = 0; lives = 3; buildShell();
    });
  }

  buildShell();
}


/* ============================================================
   TOPIC PAGE FUNCTIONALITY
   ============================================================ */
const topicPageOverlay = document.getElementById('topic-page');
const topicPageClose   = document.getElementById('topic-page-close');
let currentTopicKey    = 'all';
let allCurrentPosts    = [];

function showTopicPage(topic) {
  currentTopicKey = topic;
  let posts = [];
  let titleText = '', subtitleText = '';

  if (topic === 'all') {
    posts = [...(TOPIC_POSTS.warming || []), ...(TOPIC_POSTS.climate || []), ...(TOPIC_POSTS.bio || [])];
    titleText = 'All Blog Posts';
    subtitleText = 'Explore all our environmental blog posts across all topics';
  } else if (topic === 'warming') {
    posts = TOPIC_POSTS.warming || [];
    titleText = 'Global Warming';
    subtitleText = 'Explore the causes and effects of global warming';
  } else if (topic === 'climate') {
    posts = TOPIC_POSTS.climate || [];
    titleText = 'Climate Impact';
    subtitleText = 'Understanding how climate change affects our world';
  } else if (topic === 'bio') {
    posts = TOPIC_POSTS.bio || [];
    titleText = 'Biodiversity Loss';
    subtitleText = 'The crisis of extinction and ecosystem collapse';
  }

  if (!posts || posts.length === 0) return;
  allCurrentPosts = posts;

  document.getElementById('topic-title').textContent = titleText;
  document.getElementById('topic-subtitle').textContent = subtitleText;

  // Clear search
  const searchInput = document.getElementById('search-input');
  if (searchInput) { searchInput.value = ''; }
  document.getElementById('search-results-count').textContent = '';
  document.getElementById('search-clear').style.display = 'none';

  renderPostCards(posts);

  // Assessment — only for single-topic views
  const assessSection = document.getElementById('assessment-section');
  if (topic !== 'all' && ASSESSMENTS[topic]) {
    assessSection.style.display = 'block';
    renderAssessment(topic);
  } else {
    assessSection.style.display = 'none';
    assessSection.innerHTML = '';
  }

  topicPageOverlay.classList.add('open');
  document.documentElement.classList.add('overlay-open');
}

function renderPostCards(posts) {
  const postsGrid = document.getElementById('topic-posts-grid');
  postsGrid.innerHTML = '';

  if (!posts || posts.length === 0) {
    postsGrid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <p>No articles found. Try a different search term.</p>
      </div>`;
    return;
  }

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'topic-post-card';
    card.innerHTML = `
      <div class="topic-post-img" style="background-image: url('${post.img}')">
        <span class="topic-post-badge">${post.badge}</span>
      </div>
      <div class="topic-post-body">
        <h3>● ${post.title}</h3>
        <p>${post.subtitle}</p>
        <div class="topic-post-meta">
          <span>${post.date}</span>
          <span>${post.read}</span>
        </div>
        <button class="topic-read-btn" onclick="openModalFromTopic('${post.id}')">Read Full Post →</button>
      </div>`;
    postsGrid.appendChild(card);
  });
}

function closeTopicPage() {
  topicPageOverlay.classList.remove('open');
  document.documentElement.classList.remove('overlay-open');
}

function openModalFromTopic(postId) {
  const topic = postId.split('-')[0];
  const posts = TOPIC_POSTS[topic];
  const post  = posts ? posts.find(p => p.id === postId) : null;
  if (!post) return;

  document.getElementById('modal-hero-img').style.backgroundImage = `url('${post.img}')`;
  document.getElementById('modal-badge').textContent = post.badge;
  document.getElementById('modal-title').textContent = post.title;
  document.getElementById('modal-subtitle').textContent = post.subtitle;
  document.getElementById('modal-meta').innerHTML = `
    <span class="meta-item">👤 ${post.author}</span>
    <span class="meta-item">📅 ${post.date}</span>
    <span class="meta-item">⏱ ${post.read}</span>
    <span class="meta-tags">${post.tags.map(t => `<span>${t}</span>`).join('')}</span>`;
  document.getElementById('modal-body').innerHTML = post.body;

  // Source box
  const srcBox = document.getElementById('modal-source-box');
  if (post.source) {
    srcBox.innerHTML = `<span class="source-label">📚 Source</span><a href="${post.source.url}" target="_blank" rel="noopener">${post.source.text} ↗</a>`;
    srcBox.style.display = 'block';
  } else {
    srcBox.style.display = 'none';
  }

  modalOverlay.classList.add('open');
  document.documentElement.classList.add('overlay-open');
  modalOverlay.querySelector('.modal-box').scrollTop = 0;
}

topicPageClose.addEventListener('click', closeTopicPage);
topicPageOverlay.addEventListener('click', e => {
  if (e.target === topicPageOverlay) closeTopicPage();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (modalOverlay.classList.contains('open')) {
      closeModal();
    } else if (topicPageOverlay.classList.contains('open')) {
      closeTopicPage();
    }
  }
});

/* ── SEARCH BAR ───────────────────────────────────────────── */
const searchInput   = document.getElementById('search-input');
const searchClear   = document.getElementById('search-clear');
const resultsCount  = document.getElementById('search-results-count');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  searchClear.style.display = query.length > 0 ? 'block' : 'none';

  if (!query) {
    renderPostCards(allCurrentPosts);
    resultsCount.textContent = '';
    return;
  }

  const filtered = allCurrentPosts.filter(post => {
    const haystack = [post.title, post.subtitle, post.badge, ...(post.tags || [])].join(' ').toLowerCase();
    return haystack.includes(query);
  });

  renderPostCards(filtered);
  if (filtered.length === 0) {
    resultsCount.textContent = 'No articles matched your search.';
  } else {
    resultsCount.textContent = `${filtered.length} article${filtered.length !== 1 ? 's' : ''} found`;
  }
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.style.display = 'none';
  resultsCount.textContent = '';
  renderPostCards(allCurrentPosts);
  searchInput.focus();
});