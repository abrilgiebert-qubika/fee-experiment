/* @ds-bundle: {"format":4,"namespace":"GetMovin","components":[{"name":"PageShell"},{"name":"FlowCard"},{"name":"StepHeader"},{"name":"Stepper"},{"name":"SectionHeading"},{"name":"TextField"},{"name":"SelectField"},{"name":"Button"},{"name":"ContractPanel"},{"name":"Breadcrumb"},{"name":"ChoiceCard"},{"name":"SummaryRow"},{"name":"OfferCard"},{"name":"Notice"},{"name":"Chip"},{"name":"Disclosure"},{"name":"CreditLadder"},{"name":"Toggle"},{"name":"Checkbox"},{"name":"Radio"}]} */
(function () {
  var R = window.React, h = R.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }
  var uid = 0; function useId(given) { var ref = R.useRef(null); if (ref.current === null) ref.current = given || ('gm-f' + (++uid)); return ref.current; }

  function PageShell(p) {
    return h('div', { className: cx('gm-shell', p.className) },
      h('div', { className: 'gm-nav' }),
      h('main', { className: 'gm-ground' }, h('div', { className: 'gm-container' }, p.children)),
      p.footer === false ? null : h('footer', { className: 'gm-footer' }, h('div', { className: 'gm-container' },
        h('p', { className: 'gm-footer-brand' }, "Get Movin' FundHub"),
        p.footer || h('p', { style: { margin: 0 } }, "Get Movin' Fundraising is a company owned and operated by former PTA & PTO board volunteers. \u00a9 copyright 2017\u20132026 FundHub"))));
  }

  function FlowCard(p) {
    return h('section', { className: cx('gm-card', p.className) },
      p.header || null,
      h('div', { className: 'gm-card-body' },
        p.children,
        p.actions ? h('div', { className: 'gm-card-actions' }, p.actions) : null),
      p.panel || null);
  }

  function StepHeader(p) {
    return h('header', { className: 'gm-header' },
      h('h1', null, p.title),
      p.complete ? h('svg', { viewBox: '0 0 40 40', 'aria-hidden': 'true' },
        h('path', { d: 'M6 21l9 9L34 9', fill: 'none', stroke: 'currentColor', strokeWidth: 5, strokeLinecap: 'round', strokeLinejoin: 'round', style: { color: 'var(--white)' } })) : null);
  }

  function Stepper(p) {
    var steps = p.steps || [], cur = p.current == null ? 0 : p.current;
    if (p.variant === 'compact') {
      return h('div', { className: cx('gm-stepper-compact', p.className), role: 'group', 'aria-label': 'Progress' },
        h('div', { className: 'gm-stepper-compact-top' },
          h('span', { className: 'gm-stepper-compact-current', 'aria-current': 'step' }, steps[cur]),
          h('span', { className: 'gm-stepper-compact-next' }, cur < steps.length - 1 ? 'Next: ' + steps[cur + 1] : 'Last step')),
        h('div', { className: 'gm-stepper-compact-bars', 'aria-hidden': 'true', style: { gridTemplateColumns: 'repeat(' + steps.length + ', minmax(0, 1fr))' } },
          steps.map(function (_, i) { return h('span', { key: i, className: cx('gm-step-bar', i <= cur ? 'is-on' : null) }); })));
    }
    return h('ol', { className: cx('gm-stepper', p.className), 'aria-label': 'Progress' },
      steps.map(function (label, i) {
        var state = i < cur ? 'is-done' : i === cur ? 'is-current' : 'is-upcoming';
        return h('li', { key: i, className: cx('gm-step', state), 'aria-current': i === cur ? 'step' : undefined },
          h('span', { className: 'gm-step-bar' }), h('span', { className: 'gm-step-label' }, label));
      }));
  }

  function SectionHeading(p) {
    return h('div', { className: 'gm-section' }, h('h2', null, p.title), p.description ? h('p', null, p.description) : null);
  }

  function Field(p, control) {
    return h('div', { className: cx('gm-field', p.size === 'lg' ? 'gm-field-lg' : null) },
      h('label', { htmlFor: p.__id, className: p.hideLabel ? 'gm-sr' : null }, p.label, p.required ? '*' : ''),
      control,
      p.error ? h('p', { className: 'gm-error gm-field-error', id: p.__id + '-err', role: 'alert' }, p.error) : null,
      p.hint ? h('p', { className: 'gm-hint', id: p.__id + '-hint' }, p.hint) : null);
  }

  function describedBy(id, p) { return [p.error ? id + '-err' : null, p.hint ? id + '-hint' : null].filter(Boolean).join(' ') || undefined; }
  function fieldClass(p) { return cx('gm-input', p.size === 'lg' ? 'gm-input-lg' : null, p.error ? 'is-error' : null, p.className); }

  function TextField(p) {
    var id = useId(p.id);
    var rest = omit(p, ['label', 'hint', 'required', 'id', 'className', 'size', 'error', 'hideLabel']);
    return Field({ __id: id, label: p.label, required: p.required, hint: p.hint, error: p.error, hideLabel: p.hideLabel, size: p.size },
      h('input', Object.assign({ type: 'text' }, rest, { id: id, required: p.required, 'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': describedBy(id, p), className: fieldClass(p) })));
  }

  function SelectField(p) {
    var id = useId(p.id);
    var rest = omit(p, ['label', 'hint', 'required', 'id', 'className', 'options', 'placeholder', 'size', 'error', 'hideLabel']);
    var opts = (p.options || []).map(function (o) { var v = typeof o === 'string' ? o : o.value, l = typeof o === 'string' ? o : o.label; return h('option', { key: v, value: v }, l); });
    if (p.placeholder) opts.unshift(h('option', { key: '__ph', value: '' }, p.placeholder));
    return Field({ __id: id, label: p.label, required: p.required, hint: p.hint, error: p.error, hideLabel: p.hideLabel, size: p.size },
      h('select', Object.assign({}, rest, { id: id, required: p.required, 'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': describedBy(id, p), className: fieldClass(p) }), opts));
  }

  function Button(p) {
    /* deprecated aliases: 'secondary' merged into 'primary'; 'start' is primary with tone 'green'; 'cta' was renamed 'feature';
       sizes: 'touch' merged into 'lg'; 'sm' renders as the default size; 'xl' is ignored */
    var v = p.variant === 'secondary' ? 'primary' : p.variant === 'start' ? 'primary' : p.variant === 'cta' ? 'feature' : (p.variant || 'primary');
    var tone = v === 'primary' && (p.tone === 'green' || p.variant === 'start') ? 'green' : null;
    var size = p.size;
    var rest = omit(p, ['variant', 'tone', 'size', 'className', 'children', 'back', 'href', 'block']);
    var sizeCls = size === 'lg' || size === 'touch' ? 'gm-btn-lg' : null;
    var cls = cx('gm-btn', 'gm-btn-' + v, tone ? 'gm-btn-tone-green' : null, sizeCls, p.block ? 'gm-btn-block' : null, p.className);
    var kids = v === 'link' && p.back ? [h('span', { key: 'a', 'aria-hidden': 'true' }, '\u2190 '), p.children] : p.children;
    if (p.href) return h('a', Object.assign({}, rest, { href: p.href, className: cls }), kids);
    return h('button', Object.assign({ type: 'button' }, rest, { className: cls }), kids);
  }

  function ContractPanel(p) {
    return h('aside', { className: cx('gm-panel', p.className) },
      p.contract ? h('p', null, h('u', null, h('strong', null, 'Contract:'), ' ', p.contract)) : null,
      p.coach ? h('p', null, h('u', null, p.coach)) : null,
      p.help ? h('p', { className: 'gm-panel-help' }, p.help) : null,
      p.children);
  }

  function Breadcrumb(p) {
    var items = p.items || [];
    return h('nav', { className: cx('gm-crumbs', p.compact ? 'is-compact' : null, p.className), 'aria-label': 'Breadcrumb' },
      items.map(function (it, i) {
        var label = typeof it === 'string' ? it : it.label, href = typeof it === 'string' ? '#' : (it.href || '#');
        return i === items.length - 1
          ? h('span', { key: i, className: 'gm-crumb is-current', 'aria-current': 'page' }, label)
          : h('a', { key: i, className: 'gm-crumb', href: href }, label);
      }));
  }

  function ChoiceCard(p) {
    var id = useId(p.id);
    return h('label', { className: cx('gm-choice', p.checked ? 'is-checked' : null, p.description ? null : 'is-single', p.className), htmlFor: id },
      h('input', { type: 'radio', id: id, name: p.name, value: p.value, checked: !!p.checked, onChange: p.onChange || function () {} }),
      h('span', { className: 'gm-choice-text' },
        h('span', { className: 'gm-choice-title' }, p.title),
        p.description ? h('span', { className: 'gm-choice-desc' }, p.description) : null));
  }

  function SummaryRow(p) {
    var edit = p.onEdit || p.editHref ? h('a', { className: 'gm-summary-edit', href: p.editHref || '#', onClick: p.onEdit }, p.editLabel || 'Edit') : null;
    return h('div', { className: cx('gm-summary', p.className) },
      h('div', { className: 'gm-summary-text' },
        p.label ? h('span', { className: 'gm-summary-label' }, p.label) : null,
        h('span', { className: 'gm-summary-value' }, p.value),
        p.detail ? h('span', { className: 'gm-summary-detail' }, p.detail) : null),
      p.actions || edit ? h('div', { className: 'gm-summary-actions' }, p.actions || edit) : null);
  }

  function OfferCard(p) {
    return h('div', { className: cx('gm-offer', p.className) },
      h('div', { className: 'gm-offer-value' }, h('span', { className: 'gm-offer-amount' }, p.value), p.valueNote ? h('span', { className: 'gm-offer-note' }, p.valueNote) : null),
      h('span', { className: 'gm-offer-title' }, p.title),
      p.meta ? h('span', { className: 'gm-offer-meta' },
        h('svg', { viewBox: '0 0 24 24', width: 16, height: 16, 'aria-hidden': 'true' },
          h('rect', { x: 3, y: 5, width: 18, height: 16, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }),
          h('path', { d: 'M3 10h18M8 3v4M16 3v4', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' })), p.meta) : null,
      p.action ? h('div', { className: 'gm-offer-action' }, p.action) : null);
  }

  function Notice(p) {
    if (p.tone === 'error') return h('p', { className: cx('gm-error', p.className), role: 'alert' }, p.children);
    return h('div', { className: cx('gm-notice', p.className) },
      h('svg', { viewBox: '0 0 24 24', width: 20, height: 20, 'aria-hidden': 'true' },
        p.icon === 'leave'
          ? h('path', { d: 'M14 3h7v7M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })
          : h('path', { d: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' })),
      h('span', null, p.title ? h('strong', null, p.title, ' ') : null, h('span', { className: 'gm-notice-body' }, p.children)));
  }

  function Chip(p) {
    return h('span', { className: cx('gm-chip', 'gm-chip-' + (p.tone || 'now'), p.className) }, p.children);
  }

  function Disclosure(p) {
    return h('details', { className: cx('gm-disclosure', p.className), open: p.defaultOpen },
      h('summary', null,
        h('span', { className: 'gm-disclosure-text' },
          p.eyebrow ? h('span', { className: 'gm-disclosure-eyebrow' }, p.eyebrow) : null,
          h('span', { className: 'gm-disclosure-title' }, p.title),
          p.subtitle ? h('span', { className: 'gm-disclosure-sub' }, p.subtitle) : null,
          p.hint ? h('span', { className: 'gm-disclosure-hint' }, p.hint) : null),
        h('svg', { className: 'gm-disclosure-chev', viewBox: '0 0 24 24', width: 22, height: 22, 'aria-hidden': 'true' },
          h('path', { d: 'M6 9l6 6 6-6', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }))),
      h('div', { className: 'gm-disclosure-body' }, p.children));
  }

  function CreditLadder(p) {
    var steps = p.steps || [], max = Math.max.apply(null, steps.map(function (s) { return s.amount; }).concat([1])), earned = p.earned || 0;
    return h('div', { className: cx('gm-ladder', p.className), role: 'img', 'aria-label': p.label || 'Credits per completed referral' },
      steps.map(function (s, i) {
        return h('div', { key: i, className: cx('gm-ladder-step', i < earned ? 'is-on' : null) },
          h('span', { className: 'gm-ladder-amount' }, s.display || ('+$' + s.amount.toLocaleString('en-US'))),
          h('span', { className: 'gm-ladder-bar', style: { height: (steps.length === 5 ? [22, 36, 56, 80, 108][i] : Math.max(12, Math.round(108 * s.amount / max))) + 'px' } }),
          h('span', { className: 'gm-ladder-label' }, s.label));
      }));
  }

  function controlProps(type, p, id, cls) {
    var o = { type: type, id: id, name: p.name, value: p.value, disabled: p.disabled, required: p.required, className: cls, onChange: p.onChange };
    if (p.error) o['aria-invalid'] = 'true';
    if (p.checked !== undefined) { o.checked = !!p.checked; if (!p.onChange) o.onChange = function () {}; }
    else if (p.defaultChecked !== undefined) o.defaultChecked = p.defaultChecked;
    return o;
  }

  function Toggle(p) {
    var id = useId(p.id);
    var input = controlProps('checkbox', p, id, 'gm-toggle-input');
    input.role = 'switch';
    return h('label', { className: cx('gm-toggle', p.disabled ? 'is-disabled' : null, p.className), htmlFor: id },
      h('span', { className: 'gm-toggle-text' },
        h('span', { className: 'gm-toggle-label' }, p.label),
        p.description ? h('span', { className: 'gm-toggle-desc' }, p.description) : null),
      h('input', input),
      h('span', { className: 'gm-toggle-track', 'aria-hidden': 'true' }, h('span', { className: 'gm-toggle-knob' })));
  }

  function Checkbox(p) {
    var id = useId(p.id);
    return h('div', { className: cx('gm-checkrow', p.className) },
      h('label', { className: cx('gm-choice-row', p.disabled ? 'is-disabled' : null), htmlFor: id },
        h('input', controlProps('checkbox', p, id, 'gm-check')),
        h('span', { className: 'gm-check-text' }, p.label, p.description ? h('span', { className: 'gm-check-desc' }, p.description) : null)),
      p.error ? h('p', { className: 'gm-error gm-field-error', role: 'alert' }, p.error) : null);
  }

  function Radio(p) {
    var id = useId(p.id);
    return h('label', { className: cx('gm-choice-row', p.disabled ? 'is-disabled' : null, p.className), htmlFor: id },
      h('input', controlProps('radio', p, id, 'gm-radio')),
      h('span', { className: 'gm-check-text' }, p.label, p.description ? h('span', { className: 'gm-check-desc' }, p.description) : null));
  }

  window.GetMovin = Object.assign(window.GetMovin || {}, {
    PageShell: PageShell, FlowCard: FlowCard, StepHeader: StepHeader, Stepper: Stepper, SectionHeading: SectionHeading,
    TextField: TextField, SelectField: SelectField, Button: Button, ContractPanel: ContractPanel,
    Breadcrumb: Breadcrumb, ChoiceCard: ChoiceCard, SummaryRow: SummaryRow, OfferCard: OfferCard, Notice: Notice, Chip: Chip, Disclosure: Disclosure, CreditLadder: CreditLadder,
    Toggle: Toggle, Checkbox: Checkbox, Radio: Radio });
})();
