import type { Schema, Struct } from '@strapi/strapi';

export interface ExpGroup extends Struct.ComponentSchema {
  collectionName: 'components_exp_groups';
  info: {
    displayName: 'group';
    icon: 'filter';
  };
  attributes: {
    experiences: Schema.Attribute.Relation<
      'oneToMany',
      'api::experience.experience'
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 140;
        minLength: 2;
      }>;
  };
}

export interface SharedDays extends Struct.ComponentSchema {
  collectionName: 'components_shared_days';
  info: {
    description: '';
    displayName: 'days';
    icon: 'filter';
  };
  attributes: {
    briefAboutTheDay: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 220;
        minLength: 16;
      }>;
    representiveImg: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
  };
}

export interface SharedExcluded extends Struct.ComponentSchema {
  collectionName: 'components_shared_excludeds';
  info: {
    displayName: 'excluded';
    icon: 'italic';
  };
  attributes: {
    excluded: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeaturedPlaces extends Struct.ComponentSchema {
  collectionName: 'components_shared_featured_places';
  info: {
    description: '';
    displayName: 'featuredPlaces';
    icon: 'landscape';
  };
  attributes: {
    img: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 140;
        minLength: 2;
      }>;
  };
}

export interface SharedGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_groups';
  info: {
    description: '';
    displayName: 'group';
    icon: 'filter';
  };
  attributes: {
    destinations: Schema.Attribute.Relation<
      'oneToMany',
      'api::destination.destination'
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
        minLength: 2;
      }>;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    description: '';
    displayName: 'hero';
    icon: 'landscape';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
        minLength: 4;
      }>;
    destination: Schema.Attribute.Relation<
      'oneToOne',
      'api::destination.destination'
    >;
    heroImg: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
        minLength: 4;
      }>;
    tour: Schema.Attribute.Relation<'oneToOne', 'api::tour.tour'>;
  };
}

export interface SharedHighlight extends Struct.ComponentSchema {
  collectionName: 'components_shared_highlights';
  info: {
    description: '';
    displayName: 'highlight';
    icon: 'layout';
  };
  attributes: {
    brief: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
        minLength: 10;
      }>;
    img: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
        minLength: 4;
      }>;
  };
}

export interface SharedIncluded extends Struct.ComponentSchema {
  collectionName: 'components_shared_includeds';
  info: {
    displayName: 'included';
    icon: 'check';
  };
  attributes: {
    included: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedInclusion extends Struct.ComponentSchema {
  collectionName: 'components_shared_inclusions';
  info: {
    description: '';
    displayName: 'inclusion';
    icon: 'check';
  };
  attributes: {
    excluded: Schema.Attribute.Component<'shared.excluded', true> &
      Schema.Attribute.Required;
    included: Schema.Attribute.Component<'shared.included', true> &
      Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMoments extends Struct.ComponentSchema {
  collectionName: 'components_shared_moments';
  info: {
    displayName: 'moments';
    icon: 'landscape';
  };
  attributes: {
    moments: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedPriceTime extends Struct.ComponentSchema {
  collectionName: 'components_shared_price_times';
  info: {
    displayName: 'priceTime';
    icon: 'pin';
  };
  attributes: {
    nights: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: '1';
        },
        string
      >;
    pricePerPerson: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: '1';
        },
        string
      >;
    timeline: Schema.Attribute.Component<'shared.timeline', false>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedReview extends Struct.ComponentSchema {
  collectionName: 'components_shared_reviews';
  info: {
    displayName: 'review';
    icon: 'quote';
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
        minLength: 3;
      }>;
    review: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
        minLength: 8;
      }>;
    source: Schema.Attribute.Enumeration<
      ['google', 'whatsapp', 'instagram', 'linkedin']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'google'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTimeline extends Struct.ComponentSchema {
  collectionName: 'components_shared_timelines';
  info: {
    displayName: 'timeline';
    icon: 'clock';
  };
  attributes: {
    from: Schema.Attribute.Date &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2025-01-01'>;
    to: Schema.Attribute.Date &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2025-12-31'>;
  };
}

export interface TourGroup extends Struct.ComponentSchema {
  collectionName: 'components_tour_groups';
  info: {
    displayName: 'group';
    icon: 'filter';
  };
  attributes: {
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 2;
      }>;
    tours: Schema.Attribute.Relation<'oneToMany', 'api::tour.tour'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'exp.group': ExpGroup;
      'shared.days': SharedDays;
      'shared.excluded': SharedExcluded;
      'shared.featured-places': SharedFeaturedPlaces;
      'shared.group': SharedGroup;
      'shared.hero': SharedHero;
      'shared.highlight': SharedHighlight;
      'shared.included': SharedIncluded;
      'shared.inclusion': SharedInclusion;
      'shared.media': SharedMedia;
      'shared.moments': SharedMoments;
      'shared.price-time': SharedPriceTime;
      'shared.quote': SharedQuote;
      'shared.review': SharedReview;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.timeline': SharedTimeline;
      'tour.group': TourGroup;
    }
  }
}
